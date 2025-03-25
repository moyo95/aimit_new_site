import { NextApiRequest, NextApiResponse } from "next";

let newsData = [
  { id: 1, date: "2025-03-25", title: "ニュース1タイトル", content: "ニュース1の内容です。" },
  { id: 2, date: "2025-03-26", title: "ニュース2タイトル", content: "ニュース2の内容です。" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(newsData);
  } else if (req.method === "POST") {
    const { title, content, date } = req.body;
    if (!title || !content || !date) {
      res.status(400).json({ message: "必須項目が不足しています。" });
      return;
    }
    const newNews = { id: newsData.length + 1, title, content, date };
    newsData.push(newNews);
    res.status(201).json({ message: "ニュースが投稿されました！", news: newNews });
  } else {
    res.status(405).json({ message: "許可されていないメソッドです。" });
  }
}
