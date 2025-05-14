// app/components/ChangePassword.tsx
"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

const ChangePassword = () => {
  const { data: session, status } = useSession();
  console.log("session:", session);
console.log("user id:", session?.user?.id);
console.log("token:", session?.user?.token);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      setMessage("ログインが必要です。");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setMessage("新しいパスワードは6文字以上で入力してください。");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("新しいパスワードが一致しません。");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify({
          userId: session.user.id,
          currentPassword, // ※今は使っていないけど、API側で使うなら送る
          newPassword,
        }),
      });

      const result = await response.json();
      console.log(result);

      if (result.success) {
        setMessage("パスワードが変更されました。");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage(result.message || "パスワードの変更に失敗しました。");
      }
    } catch (error) {
      console.error("パスワード変更エラー:", error);
      setMessage("エラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleChangePassword} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">現在のパスワード</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="border rounded w-full px-2 py-1"
          disabled={loading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">新しいパスワード</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border rounded w-full px-2 py-1"
          disabled={loading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">新しいパスワード（確認）</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border rounded w-full px-2 py-1"
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "変更中..." : "パスワードを変更"}
      </button>
      {message && <p className="text-sm text-gray-700">{message}</p>}
    </form>
  );
};

export default ChangePassword;
