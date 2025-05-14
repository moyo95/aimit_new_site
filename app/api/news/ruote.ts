import { NextRequest, NextResponse } from 'next/server';

const WP_API_BASE = process.env.NEXT_PUBLIC_WP_API_BASE!;

const ITEMS_PER_PAGE = 10;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || '1';
  const currentPage = Number(page);

  if (isNaN(currentPage) || currentPage < 1) {
    return NextResponse.json({ message: "無効なページ番号です。" }, { status: 400 });
  }

  try {
    // トークンを取得
    const tokenResponse = await fetch(process.env.NEXT_PUBLIC_JWT_TOKEN_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: process.env.WORDPRESS_USERNAME, // ここにWordPressのユーザー名を設定
        password: process.env.WORDPRESS_PASSWORD, // ここにWordPressのパスワードを設定
      }),
    });

    const tokenData = await tokenResponse.json();
    
    if (!tokenData.token) {
      return NextResponse.json({ message: "トークンの取得に失敗しました。" }, { status: 401 });
    }

    // APIリクエストを送信
    const response = await fetch(
      `${WP_API_BASE}?_embed&per_page=${ITEMS_PER_PAGE}&page=${currentPage}`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${tokenData.token}`, // Bearerトークンを使って認証
        }
      }
    );

    if (!response.ok) {
      return NextResponse.json({ message: "ニュースの取得に失敗しました。" }, { status: response.status });
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

    return NextResponse.json(newsList, {
      headers: {
        "X-WP-Total": totalItems || "0",
        "X-WP-TotalPages": totalPages || "0"
      }
    });

  } catch (error) {
    console.error("サーバーエラー:", error);
    return NextResponse.json({ message: "サーバーエラーが発生しました。" }, { status: 500 });
  }
}
