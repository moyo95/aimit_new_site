// "use client";
// import { FC } from "react";
// import { signIn } from "next-auth/react";

// const SignInPageContent: React.FC = () => {
//   return (
//     <div className="text-center p-8 bg-white shadow-lg rounded-lg mt-10">
//       <p>aimit login</p>
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">ログイン</h1>
//       <button
//         onClick={() => signIn("google")}
//         className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-200"
//       >
//         Googleでログイン
//       </button>
//     </div>
//   );
// };

// export { SignInPageContent }; 


"use client";
import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import SignUpModal from "@/app/components/SignUpModal";

const SignInPageContent: React.FC = () => {
  // const [email, setEmail] = useState("");
  const [username, setUsername] = useState<string>('');  // 初期値を空文字に設定

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleEmailSignIn = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      // email,
      username,
      password,
    });

    if (res?.error) {
      setError("メールアドレスまたはパスワードが間違っています");
    } else {
      // 認証成功した場合の処理（リダイレクトなど）
      window.location.href = "/dashboard"; // 例: ダッシュボードにリダイレクト
    }
  };

  return (
    <div className="text-center p-8 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">ログイン</h1>

      <div className="mb-4">
        {/* <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full"
        /> */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          name="username"
          onChange={(e) => setUsername(e.target.value)}
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

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        onClick={handleEmailSignIn}
        className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-200 w-full"
      >
        メールでログイン
      </button>

      <div className="mt-4">
        <button
          onClick={() => signIn("google")}
          className="bg-red-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-red-600 transition duration-200 w-full"
        >
          Googleでログイン
        </button>
      </div>
    </div>
  );
};

export { SignInPageContent };
