// app/components/UserInfo.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import ChangePassword from "./ChangePassword";

export default function UserInfo() {
  const { data: session, update } = useSession();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!session) return null;

  const isPasswordLogin = session.user.provider === "credentials";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const isTokenExpired = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const exp = payload.exp * 1000;
      return exp < Date.now();
    } catch {
      return true;
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);

    let token = session.user?.token;

    // トークンの期限切れチェックと再ログイン
    if (token && isTokenExpired(token)) {
      const password = prompt("トークンの有効期限が切れています。パスワードを再入力してください");
      if (!password) {
        alert("パスワードが必要です");
        setUploading(false);
        return;
      }

      const result = await signIn("credentials", {
        redirect: false,
        username: session.user.name,
        password,
      });

      if (result?.error) {
        alert("再ログインに失敗しました");
        setUploading(false);
        return;
      }

      await update();
      token = session.user?.token;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/upload-profile-image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        const password = prompt("画像更新後に再ログインが必要です。パスワードを入力してください");
        if (!password) {
          alert("パスワードが必要です");
          setUploading(false);
          return;
        }

        const result = await signIn("credentials", {
          redirect: false,
          username: session.user.name,
          password,
        });

        if (result?.error) {
          alert("再ログインに失敗しました");
        } else {
          await update();
          alert("アイコンを更新しました");
          setPreview(null);
          setSelectedFile(null);
          window.location.reload(); // 強制再描画
        }
      } else {
        alert(data.message || "アップロードに失敗しました");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("アップロード中にエラーが発生しました");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    console.log("最新セッション:", session);
  }, [session]);

  return (
    <div className="p-10 border rounded-md bg-white shadow">
      <div className="flex items-center">
        <div className="mb-4 rainbow-ring">
          <img
            key={session.user.image}
            src={preview || session.user.image || "/default-avatar.jpg"}
            alt="User Image"
            className="w-16 h-16 rounded-full object-cover cursor-pointer hover:opacity-80 transition"
            onClick={handleImageClick}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <div className="text-left ml-10">
          <h2 className="text-lg font-semibold mb-2">ユーザー情報</h2>
          <p>名前: {session.user.name}</p>
          <p>メール: {session.user.email}</p>
        </div>
      </div>

      {preview && (
        <div className="mt-4">
          <button
            className="px-4 py-1 bg-blue-500 text-white rounded"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "アップロード中..." : "画像をアップロード"}
          </button>
        </div>
      )}

      {isPasswordLogin && (
        <>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="mt-4 text-blue-600 underline"
          >
            {showPasswordForm ? "パスワード変更を閉じる" : "パスワード変更"}
          </button>
          {showPasswordForm && (
            <div className="mt-4">
              <ChangePassword />
            </div>
          )}
        </>
      )}
    </div>
  );
}
