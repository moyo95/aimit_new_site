import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const imageDir = path.join(process.cwd(), "public/images"); // 画像フォルダのパス
  const files = fs.readdirSync(imageDir); // フォルダ内のファイルを取得
  const images = files.map((file) => `/images/${file}`); // 公開パスを生成

  res.status(200).json({ images }); // クライアントに画像リストを返却
}
