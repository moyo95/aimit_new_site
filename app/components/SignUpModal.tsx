"use client";
import { useState } from "react";

type Props = {
  onClose: () => void;
};

export default function SignUpModal({ onClose }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // ユーザー名の状態を追加
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      setError("すべてのフィールドを入力してください");
      return;
    }

    // ユーザー名のバリデーション（英数字と一部の記号のみ許可）
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    if (!usernameRegex.test(username)) {
      setError("ユーザー名は英数字、ハイフン、アンダースコアのみ使用できます");
      return;
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        alert("登録完了！ログインしてください");
        onClose();
      } else {
        const data = await res.json();
        setError(data.message || "登録に失敗しました");
      }
    } catch (error) {
      setError("ネットワークエラーが発生しました");
      console.error("Sign-up error:", error);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">新規登録</h2>

      {/* エラーメッセージ */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <input
        className="w-full mb-3 p-2 border rounded"
        type="text"
        placeholder="ユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="w-full mb-3 p-2 border rounded"
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full mb-4 p-2 border rounded"
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSignUp}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        登録
      </button>
    </div>
  );
}
