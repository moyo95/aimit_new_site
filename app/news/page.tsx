"use client";
import heroData from "../../public/data/heroData.json";
import Heros from "../components/Heros";
import { useState, useEffect } from "react";

type NewsItem = {
    id: number;
    date: string;
    title: string;
    content: string;
  };
// Propsの型を定義
type NewsProps = {
  showAll?: boolean;
  withWrapper?: boolean;
  wrapperClass?: string;
};

const News = ({ showAll = true, withWrapper = true, wrapperClass = "" }: NewsProps) => {
  // ニュースデータとAPIから取得
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // ページ管理
  const itemsPerPage = 10; // 1ページあたりのアイテム数

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch("/api/news");
      const data = await response.json();
      setNews(data);
    };

    fetchNews();
  }, []);

  // ページネーションのロジック
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedNews = news.slice(startIndex, endIndex); // 現在のページデータ
  const totalPages = Math.ceil(news.length / itemsPerPage);

  // ページネーションの処理
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // ニュースの内容
  const NewsContent = (
    <>
      {paginatedNews.length > 0 ? (
        paginatedNews.map((newsItem) => (
          <div key={newsItem.id} className="flex border border-gray-500 rounded-lg gap-3 px-4 py-5 mb-4">
            <p>{newsItem.date}</p>
            <h2>{newsItem.title}</h2>
          </div>
        ))
      ) : (
        <p>現在、ニュースはありません。</p>
      )}
    </>
  );

  // レンダリング
  return withWrapper ? (
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
      <section id="news" className={`w-full py-10 md:py-20 bg-gray-50 md:min-h-screen ${wrapperClass}`}>
        <div className="container mx-auto px-4 my-10 md:my-20">
          <div className="text-center mb-6 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-10">ニュース・トピック 一覧</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-loose">
              アイミットの最新ニュースから、おすすめ情報やお得な情報まで、今必要な情報をいち早くお届けします。
            </p>
          </div>
          <div className="container mx-auto w-2/3 mb-4 block justify-center">{NewsContent}</div>
          {/* ページネーション */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={currentPage === 1}
            >
              前へ
            </button>
            <p className="text-lg">
              ページ {currentPage} / {totalPages}
            </p>
            <button
              onClick={handleNext}
              className={`px-4 py-2 bg-blue-500 text-white rounded ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentPage === totalPages}
            >
              次へ
            </button>
          </div>
        </div>
      </section>
    </>
  ) : (
    <>
      <div className="bg-slate-200 w-[100vw]">
        <div className="container text-center pt-6 pb-3 mx-auto flex items-center justify-center">
          <h1 className="text-3xl font-bold mr-5 mb-4">News</h1>
          <div className="px-4 py-5 w-1/2 rounded-lg">{NewsContent}</div>
        </div>
      </div>
    </>
  );
};

export default News;
