"use client";
import { useState } from "react";

const NewsForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // フォーム送信を防止
    const postData = async () => {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, date }),
      });

      if (response.ok) {
        alert("ニュースが投稿されました！");
        setTitle("");
        setContent("");
        setDate("");
      } else {
        alert("投稿に失敗しました。");
      }
    };

    postData();
  };

  return (
    <section className="container my-10 min-h-screen">
    <form
  className="mt-48 mx-auto max-w-lg bg-white shadow-lg p-8 rounded-lg space-y-6"
  onSubmit={handleSubmit}
>
  <h2 className="text-2xl font-bold text-center text-gray-800">ニュースを投稿</h2>

  <div className="flex flex-col">
    <label className="mb-2 text-sm font-medium text-gray-700">タイトル</label>
    <input
      type="text"
      placeholder="タイトル"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="border border-gray-300 p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="flex flex-col">
    <label className="mb-2 text-sm font-medium text-gray-700">内容</label>
    <textarea
      placeholder="内容"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="border border-gray-300 p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 h-28 resize-none"
    />
  </div>

  <div className="flex flex-col">
    <label className="mb-2 text-sm font-medium text-gray-700">日付</label>
    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      className="border border-gray-300 p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <button
    type="submit"
    className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-200"
  >
    投稿
  </button>
</form>

    </section>
  );
};

export default NewsForm;
