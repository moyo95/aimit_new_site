"use client";

import { useState } from "react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // ユーザー名の追加
  const [error, setError] = useState<string | null>(null);


  const handleSignUp = async () => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert("登録完了！");
      } else {
        alert("登録失敗: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("エラーが発生しました");
    }
  };

  
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg mt-10 w-80">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">新規登録</h1>

        {/* エラーメッセージ */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full"
          />
        </div>

        <button
          onClick={handleSignUp}
          className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-200 w-full"
        >
          登録
        </button>
      </div>
    </div>
  );
}
