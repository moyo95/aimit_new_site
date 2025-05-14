import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, File as FormidableFile } from "formidable";
import fs from "fs";
import FormData from "form-data";
import { getToken } from "next-auth/jwt";
import axios from "axios";

export const config = {
  api: {
    bodyParser: false, // ✅ Formidable で multipart/form-data を処理
  },
};

// フォーム解析
async function parseForm(req: NextApiRequest): Promise<{
  fields: { [key: string]: any };
  files: { [key: string]: FormidableFile | FormidableFile[] | undefined };
}> {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({ keepExtensions: true });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

// トークンをリフレッシュ
async function getNewToken(refreshToken: string): Promise<string> {
  const response = await fetch(`${process.env.WP_TOKEN_REFRESH_URL}`, {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Token refresh failed");
  }

  return data.token || data.newToken;
}

// WordPressに画像をアップロード
async function uploadToWordPress({
  filePath,
  fileName,
  token,
}: {
  filePath: string;
  fileName: string;
  token: string;
}) {
  const WP_API_BASE = process.env.NEXT_PUBLIC_WP_API_BASE;
  const formData = new FormData();

  formData.append("file", fs.createReadStream(filePath), {
    filename: fileName,
    contentType: "image/jpeg", // 必要に応じて変更
  });

  try {
    const response = await axios.post(`${WP_API_BASE}/media`, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${token}`,
      },
    });

    return { wpRes: { ok: true, status: response.status }, wpData: response.data };
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        wpRes: {
          ok: false,
          status: error.response.status,
        },
        wpData: error.response.data,
      };
    }
    throw new Error("WordPressへのaxios接続に失敗しました");
  }
}

// WPGraphQL経由でavatar URLをユーザーに設定
async function updateUserAvatar({
  userId,
  avatarUrl,
  token,
}: {
  userId: string;
  avatarUrl: string;
  token: string;
}) {
  const WP_GRAPHQL_ENDPOINT = process.env.WP_GRAPHQL_ENDPOINT;

  const query = `
    mutation UpdateUserAvatar($userId: ID!, $avatarUrl: String!) {
      updateUser(
        input: {
          id: $userId
          meta: {
            avatar: $avatarUrl
          }
        }
      ) {
        user {
          id
          name
          meta {
            avatar
          }
        }
      }
    }
  `;

  const response = await axios.post(
    WP_GRAPHQL_ENDPOINT!,
    {
      query,
      variables: { userId, avatarUrl },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.data.errors) {
    throw new Error(response.data.errors[0].message);
  }

  return response.data.data.updateUser.user;
}

// メインAPIハンドラ
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end("Method not allowed");
  }

  const token = req.headers.authorization?.split(" ")[1];
  console.log("受け取ったトークン:", token);

  if (!token) {
    return res.status(401).json({ message: "認証トークンがありません" });
  }

  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    return res.status(500).json({ message: "環境変数が設定されていません" });
  }

  try {
    const { fields, files } = await parseForm(req);
    const uploaded = files.file;
    const uploadedFile = Array.isArray(uploaded) ? uploaded[0] : uploaded;

    if (!uploadedFile) {
      return res.status(400).json({ message: "ファイルがアップロードされていません" });
    }

    // WordPress に画像アップロード
    let { wpRes, wpData } = await uploadToWordPress({
      filePath: uploadedFile.filepath,
      fileName: uploadedFile.originalFilename || "upload.jpg",
      token,
    });

    // トークンエラー時のリトライ
    if (wpRes?.status === 403 && wpData.code === "jwt_auth_invalid_token") {
      const jwt = await getToken({ req, secret });

      if (!jwt?.refreshToken) {
        return res.status(401).json({ message: "リフレッシュトークンが見つかりません" });
      }

      try {
        const newToken = await getNewToken(jwt.refreshToken as string);

        const retryResult = await uploadToWordPress({
          filePath: uploadedFile.filepath,
          fileName: uploadedFile.originalFilename || "upload.jpg",
          token: newToken,
        });

        wpRes = retryResult.wpRes;
        wpData = retryResult.wpData;

        if (!wpRes.ok) {
          return res
            .status(wpRes.status)
            .json({ message: wpData.message || "再アップロードに失敗しました" });
        }
      } catch (error) {
        console.error("トークンのリフレッシュ失敗:", error);
        return res.status(500).json({ message: "トークンのリフレッシュに失敗しました" });
      }
    }

    if (!wpRes.ok) {
      console.error("WordPress upload failed:", wpData);
      return res
        .status(wpRes.status)
        .json({ message: wpData.message || "アップロードに失敗しました" });
    }

    // ✅ アバターを更新する（GraphQL）
    const jwt = await getToken({ req, secret });
    const userId = jwt?.sub?.replace("user:", "") ?? null;

    if (!userId) {
      return res.status(400).json({ message: "ユーザーIDが見つかりません" });
    }

    try {
      await updateUserAvatar({
        userId,
        avatarUrl: wpData.source_url,
        token,
      });

      return res.status(200).json({ avatarUrl: wpData.source_url });
    } catch (error: any) {
      console.error("ユーザーのavatar更新に失敗:", error.message);
      return res.status(500).json({ message: "ユーザー情報の更新に失敗しました" });
    }
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ message: "サーバーエラーが発生しました" });
  }
}
