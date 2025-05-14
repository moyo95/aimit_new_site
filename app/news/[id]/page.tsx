// app/news/[id]/pages.tsx
"use client";

import Heros from "@/app/components/Heros";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import heroData from "../../../public/data/heroData.json";
import { StickyNote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

type CategoryType = {
  id: number;
  name: string;
};

type NewsItem = {
  id: number;
  title: string;
  content: string;
  date: string;
  image_url?: string;
  categories?: CategoryType[];
};

interface NextPrevResponse {
  postId?: number | null;
}

const NewsDetailPage = () => {
  const pathname = usePathname();
  const id = pathname?.split("/").pop() ?? null;

  const router = useRouter();
  const { data: session, status } = useSession();
  
  // console.log("SESSION", session);
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [prevId, setPrevId] = useState<number | null>(null);
  const [nextId, setNextId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdjacentId = async (direction: "next" | "prev", currentId: number): Promise<number | null> => {
    try {
      const res = await fetch(`/api/get-next-post-id?currentId=${currentId}&direction=${direction}`, {
        cache: "no-store",
      });
      const data: NextPrevResponse = await res.json();
      return data.postId ?? null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchNewsItem = async () => {
      if (!id) {
        setError("ニュースIDが無効です。");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/news/${id}`, { cache: "no-store" });

        if (!response.ok) {
          const errorMessage =
            response.status === 404
              ? "投稿が見つかりませんでした。"
              : `ニュースの取得に失敗しました: ${response.status}`;
          throw new Error(errorMessage);
        }

        const data: NewsItem = await response.json();
        setNewsItem(data);

        const [prev, next] = await Promise.all([
          fetchAdjacentId("prev", data.id),
          fetchAdjacentId("next", data.id),
        ]);
        setPrevId(prev);
        setNextId(next);
      } catch (err) {
        setError(err instanceof Error ? err.message : "不明なエラーが発生しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsItem();
  }, [id]);

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>無効なURLです。</p>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p>{error}</p>
        <button
          onClick={() => router.push("/news")}
          className="text-blue-600 underline hover:text-blue-800"
        >
          ニュース一覧へ戻る
        </button>
      </div>
    );
  }

  if (!newsItem) {
    return <p>ニュースが見つかりません。</p>;
  }

  return (
    <>
      <Heros
        id={String(newsItem.id)}
        title={newsItem.title}
        // subtitle={newsItem.title}
        // description={newsItem.title}
        backgroundImage={newsItem.image_url || heroData.form.backgroundImage}
        primaryButton={heroData.news.primaryButton}
        secondaryButton={heroData.news.secondaryButton}
      />

      <section id="news_post" className="w-full py-10 bg-gray-50 md:min-h-screen">
        <div className="container mx-auto px-4 my-10 md:my-20 w-full md:w-2/3">
          <h2 className="text-2xl mb-5 flex items-center">
            <StickyNote className="w-6 h-6 mr-2" />
            {newsItem.title}
          </h2>

          <div className="flex items-center text-sm text-gray-500 mb-5">
            投稿日:{" "}
            {new Date(newsItem.date).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {newsItem.categories && newsItem.categories.length > 0 && (
              <div>
                {newsItem.categories.map((cat) => (
                  <span
                    key={cat.id}
                    className="mx-1 bg-gray-500 text-white text-[10px] px-2 py-[2px] rounded"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="leading-loose" dangerouslySetInnerHTML={{ __html: newsItem.content }} />

          <div className="my-10 flex justify-end">
            <button
              className="text-gray-500 border border-gray-400 py-1 px-3 rounded-lg"
              onClick={() => router.push("/news")}
            >
              一覧に戻る
            </button>

            {session?.user?.role === "admin" && (
              <Link href={`/news/form?id=${newsItem.id}`}>
                <button className="ml-2 text-gray-500 border border-gray-400 py-1 px-3 rounded-lg hover:bg-blue-800 hover:border-blue-800 hover:text-white">
                              編集する
                            </button>
              </Link>
            )}
          </div>
        </div>

        <div className="my-10 flex justify-between w-full md:w-2/3 mx-auto">
          {prevId !== null ? (
            <button
              className="bg-gray-700 text-white py-2 px-4 rounded-lg"
              onClick={() => router.push(`/news/${prevId}`)}
            >
              前へ
            </button>
          ) : (
            <div />
          )}

          {nextId !== null ? (
            <button
              className="bg-gray-700 text-white py-2 px-4 rounded-lg"
              onClick={() => router.push(`/news/${nextId}`)}
            >
              次へ
            </button>
          ) : (
            <div />
          )}
        </div>
      </section>
    </>
  );
};

export default NewsDetailPage;
