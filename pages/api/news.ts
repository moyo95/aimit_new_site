// pages/api/news.ts
import { NextApiRequest, NextApiResponse } from "next";

const WP_API_BASE = process.env.WP_API_BASE;

if (!WP_API_BASE) {
  throw new Error("WP_API_BASE is not defined in environment variables");
}
// const WP_API_BASE = "https://**/wp-json/wp/v2/posts";
const ITEMS_PER_PAGE = 10;
// const JWT_SECRET_KEY = ""; // wp-config.phpと一致させること
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is not defined in environment variables");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page = 1 } = req.query;
  const currentPage = Number(page);

  if (isNaN(currentPage) || currentPage < 1) {
    return res.status(400).json({ message: "無効なページ番号です。" });
  }

  try {
    // ✅ JWTトークン取得
    const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_AUTH_PATH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: process.env.WORDPRESS_USERNAME,  // .env.localからユーザー名を取得
        password: process.env.WORDPRESS_PASSWORD,// WordPressのユーザー名
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("✅ JWTトークン取得失敗:", tokenResponse.status, errorText);
      return res.status(401).json({ message: "トークンの取得に失敗しました。", error: errorText });
    }

    const tokenData = await tokenResponse.json();
    const token = tokenData.token;

    if (!token) {
      console.error("✅ JWTトークンが存在しません:", tokenData);
      return res.status(401).json({ message: "トークンの取得に失敗しました。", tokenData });
    }

    // ✅ WordPress投稿の取得（Bearerトークン使用）
    const response = await fetch(
      `${WP_API_BASE}?_embed&per_page=${ITEMS_PER_PAGE}&page=${currentPage}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("✅ WordPress APIエラー:", response.status, errorText);
      return res.status(response.status).json({ message: "ニュースの取得に失敗しました。", error: errorText });
    }

    const posts = await response.json();
    const totalItems = response.headers.get("X-WP-Total");
    const totalPages = response.headers.get("X-WP-TotalPages");

    const newsList = posts.map((post: any) => ({
      id: post.id,
      date: post.date,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered,
      image_url: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
    }));

    res.setHeader("X-WP-Total", totalItems || "0");
    res.setHeader("X-WP-TotalPages", totalPages || "0");

    return res.status(200).json(newsList);
  } catch (error) {
    console.error("✅ サーバーエラー:", error);
    return res.status(500).json({ message: "サーバーエラーが発生しました。" });
  }
}
