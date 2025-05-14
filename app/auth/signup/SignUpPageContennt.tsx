"use client";
import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import SignUpModal from "../../components/SignUpModal"; // ✅ コメントアウト解除

const SignUpPageContent: FC = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="text-center p-8 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">ログイン</h1>

      <button
        onClick={() => signIn("google")}
        className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-200"
      >
        Googleでログイン
      </button>

      <div className="mt-6">
        <button
          onClick={() => setShowSignUp(true)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          新規登録はこちら
        </button>
      </div>

      {/* ✅ モーダル表示処理 */}
      {showSignUp && (
        <SignUpModal onClose={() => setShowSignUp(false)} />
      )}
    </div>
  );
};

export { SignUpPageContent };
