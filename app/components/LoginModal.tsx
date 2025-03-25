"use client";

import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { SignInPageContent } from "../auth/signin/page"; // SignInPageContentをインポート

const LoginModal = () => {
  const { data: session } = useSession(); // 認証状態を取得
  const [isOpen, setIsOpen] = useState(false); // モーダル開閉状態を管理
  const toggleModal = () => setIsOpen(!isOpen);
  const [isHovered, setIsHovered] = useState(false); // ホバー状態を管理

  return (
    <>
      {session ? (
        // ログイン済みの場合の表示
        <div
          style={{
            display: "inline-block",
            position: "relative", // ログアウトボタンを配置するために相対位置
          }}
          onMouseEnter={() => setIsHovered(true)} // マウスオーバー時
          onMouseLeave={() => setIsHovered(false)} // マウスが外れた時
        >
           {isHovered ? (
            // ホバー時に表示される「ログアウトボタン」
            <button
              onClick={() => signOut()} // ログアウト処理
              style={{
                padding: "5px 10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              ログアウト
            </button>
          ) : (
            // ホバーしていない時に表示される「ログイン中：」
            <p style={{ 
              color: "white",
              cursor: "pointer",
              padding: "5px 10px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "black",
              }}>
              {/* ログイン中：{session.user?.name || "ゲスト"} */}
              ログ中{session.user?.name || "ゲスト"}
            </p>
          )}
        </div>
      ) : (
        // 未ログインの場合のログインボタン
        <button
          onClick={() => toggleModal()} // モーダルを開く
          style={{
            cursor: "pointer",
            padding: "10px 20px",
            backgroundColor: "#044592",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          ログイン
        </button>
      )}

      {/* モーダル */}
      {isOpen && !session && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* ログインフォームを表示 */}
            <SignInPageContent />
            <button
              onClick={toggleModal} // モーダルを閉じる処理
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                backgroundColor: "gray",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
