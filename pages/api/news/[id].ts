// pages/api/news/[id].ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_WP_API_BASE}/posts/${id}?_embed`);

      if (!response.ok) {
        if (response.status === 404) {
          res.status(404).json({ message: "投稿が見つかりませんでした。" });
          return;
        }
        res.status(response.status).json({ message: "データの取得に失敗しました。" });
        return;
      }

      const post = await response.json();

      // カテゴリ名の取得
      const categories =
        post._embedded?.["wp:term"]?.[0]?.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
        })) || [];

      const newsItem = {
        id: post.id,
        date: post.date,
        title: post.title.rendered,
        content: post.content.rendered,
        created_at: post.date,
        updated_at: post.modified,
        image_url: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
        categories, // ← カテゴリ情報を追加！
      };

      res.status(200).json(newsItem);
    } catch (error) {
      console.error("データの取得に失敗しました:", error);
      res.status(500).json({ message: "サーバーエラーが発生しました。" });
    }
  } else {
    res.status(405).json({ message: "許可されていないメソッドです。" });
  }
}
