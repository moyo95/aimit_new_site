// pages/api/contact.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // 使用するメールサービスを指定します（例: gmail）
  auth: {
    user: process.env.EMAIL_USER, // 環境変数に設定した送信元メールアドレス
    pass: process.env.EMAIL_PASS, // 環境変数に設定した送信元メールアドレスのパスワード
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, phone, message } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'mycity1903@gmail.com', // 送信先のメールアドレス
      subject: '【アイミットHP】お問い合わせがありました',
      text: `
        お名前: ${name}
        メールアドレス: ${email}
        電話番号: ${phone}
        お問い合わせ内容:
        ${message}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'メールが送信されました！' });
    } catch (error) {
      console.error('メール送信エラー:', error);
      res.status(500).json({ message: 'メールの送信に失敗しました。' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
