"use client";
import { useSession, signOut } from "next-auth/react";

const UserDashboard = () => {
  const { data: session } = useSession(); // セッションデータを取得
  const userName = session?.user?.name || "ゲスト"; // ユーザー名のデフォルト値を設定

  if (session && session.user) {
    console.log(`ユーザー名: ${session.user.name}`); // ユーザー名をログ出力
  } else {
    console.log("ユーザーは未ログインです。");
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {session ? (
        <div className="flex items-center">
          <p>{userName}さん！</p>
          <button
            onClick={() => signOut()}
            style={{
              cursor: "pointer",
              padding: "8px 16px",
              border: "none",
              background: "red",
              color: "white",
              borderRadius: "4px",
            }}
          >
            LOGIN
          </button>
        </div>
      ) : (
        <p>LOGOUT</p>
      )}
    </div>
  );
};

export default UserDashboard;
