import React from "react";

interface PaginationProps {
  currentPage: number; // 現在のページ番号
  totalPages: number;  // 総ページ数
  onPageChange: (page: number) => void; // ページが変更されたときのハンドラ
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4">
      {/* 前へボタン */}
      <button
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        className={`py-2 px-4 border rounded-lg ${
          currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-700 text-white"
        }`}
      >
        前へ
      </button>

      {/* 現在のページ情報 */}
      <span>
        ページ {currentPage} / {totalPages}
      </span>

      {/* 次へボタン */}
      <button
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className={`py-2 px-4 border rounded-lg ${
          currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-700 text-white"
        }`}
      >
        次へ
      </button>
    </div>
  );
};

export default Pagination;
