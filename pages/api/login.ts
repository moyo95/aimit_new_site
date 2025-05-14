import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // POSTメソッドの確認
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // フロントエンドから送られたデータ（emailとpassword）
  const { email, password } = req.body;

  // 必要なデータが送信されていない場合のエラーチェック
  if (!email || !password) {
    return res.status(400).json({ message: 'メールアドレスとパスワードは必須です' });
  }

  try {
    // WordPressに対して認証リクエスト
    const response = await fetch(process.env.NEXT_PUBLIC_WP_JWT_TOKEN_ENDPOINT as string, {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password }),
    });

    const data = await response.json();

    // エラーハンドリング
    if (!response.ok) {
      return res.status(401).json({ message: 'ログインに失敗しました', error: data });
    }

    // ログイン成功時、JWTトークンを返す
    return res.status(200).json({ message: 'ログイン成功', token: data.token });
  } catch (error) {
    console.error('ログインエラー:', error);
    return res.status(500).json({ message: 'サーバーエラーが発生しました', error });
  }
}
