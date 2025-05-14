import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // POSTメソッドの確認
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // フロントエンドから送られたデータ
  const { username, email, password } = req.body;

  // ユーザー作成リクエスト
  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_WP_API_BASE}/users`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Basic " + Buffer.from("admin:WP_APP_PASSWORD").toString("base64"), // 管理者の認証情報
        Authorization: "Basic " + Buffer.from(`${process.env.WP_ADMIN_USER}:${process.env.WP_APP_PASSWORD}`).toString("base64"),

      },
      body: JSON.stringify({
        username,
        email,
        password,
        roles: ["subscriber"], // 権限設定（例：subscriber）
      }),
    });

    const data = await response.json();

    // エラー処理
    if (!response.ok) {
      console.error("WordPress API Error:", data); // ← サーバー側に表示
      return res.status(400).json({
        message: "登録に失敗しました",
        error: data, // ← フロントにも返す
      });
    }
    

    // 成功時
    return res.status(200).json({ message: "登録成功", user: data });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "サーバーエラーが発生しました", error });
  }
}
