import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, email, password } = req.body;

  const adminUser = process.env.WP_ADMIN_USER;
  const appPassword = process.env.WP_APP_PASSWORD;

  if (!adminUser || !appPassword) {
    return res.status(500).json({ message: "認証情報が設定されていません" });
  }

  const auth = Buffer.from(`${adminUser}:${appPassword}`).toString("base64");

    const response = await fetch(`${process.env.NEXT_PUBLIC_WP_API_BASE}/users`, {

    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      username,
      email,
      password,
      roles: ["subscriber"],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("WordPress API Error:", data); // ターミナルログに表示
    return res.status(400).json({
      message: "登録に失敗しました",
      error: data, // ← この行でエラーデータをクライアントにも返す！
    });
  }
  

  return res.status(200).json({ message: "登録成功", user: data });
}
