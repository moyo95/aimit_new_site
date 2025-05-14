"use client";
//app/components/LoginModal.tsx
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { SignInPageContent } from "../auth/signin/SignInPageContent";
import SignUpModal from "./SignUpModal";

const LoginModal = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false); // ログイン/新規登録の切替

  const closeModal = () => {
    setIsOpen(false);
    setShowSignUp(false); // 閉じるときはどちらもリセット
  };

  return (
    <>
      {session ? (
        <div
          style={{ display: "inline-block", position: "relative" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <button
              onClick={() => signOut()}
              style={{
                padding: "5px 20px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              LogOut
            </button>
          ) : (
            <p
              style={{
                color: "white",
                cursor: "pointer",
                padding: "5px 10px",
                border: "none",
                borderRadius: "4px",
                backgroundColor: "#0070f3",
                whiteSpace: "nowrap",
              }}
            >
              LogIn : {session.user?.name || "ゲスト"}
            </p>
          )}
        </div>
      ) : (
        <button
          className="bg-slate-800 text-white hover:bg-red-500 py-1 px-5 rounded-md transition-colors"
          onClick={() => setIsOpen(true)}
        >
          LogIn
        </button>
      )}

      {/* モーダル（共通） */}
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
            margin:0,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              position: "relative",
            }}
          >
            {/* ログイン or 新規登録 */}
            {showSignUp ? (
              <>
                {/* <h2 className="text-xl font-bold mb-4 text-center">新規登録</h2> */}
                <SignUpModal onClose={closeModal} />
                <p className="mt-4 text-sm text-center">
                  すでにアカウントをお持ちですか？{" "}
                  <button
                    onClick={() => setShowSignUp(false)}
                    className="text-blue-600 underline"
                  >
                    ログインへ
                  </button>
                </p>
              </>
            ) : (
              <>
                <SignInPageContent />
                <div className="flex justify-end mt-4">
                  <button
                    onClick={closeModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  >
                    閉じる
                  </button>
                  <button
                    onClick={() => setShowSignUp(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    新規登録
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
