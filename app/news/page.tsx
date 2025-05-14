//app/news/pages.tsx

"use client";

import { useSession } from "next-auth/react"; // NextAuth.js を使用している場合
import heroData from "../../public/data/heroData.json";
import Heros from "../components/Heros";
import NewsList from "../components/NewsList";
import { useEffect, useState } from "react";
import { NewsItem } from "../components/NewsList";

const NewsPage = () => {
  const { data: session } = useSession(); // セッション情報を取得
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/news?page=${currentPage}`);
        if (!response.ok) {
          const message = `ニュースの取得に失敗しました: ${response.status}`;
          setError(message);
          throw new Error(message);
        }
        const data = await response.json();
        const totalPagesHeader = response.headers.get("X-WP-TotalPages");
        setNewsItems(data);
        setTotalPages(totalPagesHeader ? parseInt(totalPagesHeader, 10) : 1);
      } catch (err) {
        console.error("ニュース取得エラー:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 px-3 py-1 rounded-md ${
            currentPage === i ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }
    return <div className="flex justify-center mt-8">{pages}</div>;
  };

  return (
    <>
      <Heros
        id={heroData.news.id}
        title={heroData.news.title}
        subtitle={heroData.news.subtitle}
        description={heroData.news.description}
        backgroundImage={heroData.news.backgroundImage}
        primaryButton={heroData.news.primaryButton}
        secondaryButton={heroData.news.secondaryButton}
      />
      <section id="news" className="w-full py-10 md:py-20 bg-gray-50 md:min-h-screen">
        <div className="container mx-auto px-4 my-10 md:my-20">
          <div className="container mx-auto w-full md:w-2/3 mb-4">
            {loading ? (
              <p>Loading news...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <NewsList
                newsItems={newsItems}
                showAll={true}
                className="block"
                itemClassName="flow p-2 bg-gray-100 bg-transparent mx-auto"
                baceClassName="border border-gray-200 rounded-lg p-2 flex items-center gap-5"
              />
            )}
          </div>

          {/* 管理者でない場合は編集ボタンを非表示にする */}
          {/* {session?.user?.role === "admin" && (
            <button className="bg-blue-500 text-white p-2 rounded">
              編集
            </button>
          )} */}

          {totalPages > 1 && renderPagination()}
        </div>
      </section>
    </>
  );
};

export default NewsPage;
