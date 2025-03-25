// "use client";
// import { signIn } from "next-auth/react";

// const SignInPage = () => {
//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="text-center p-8 bg-white shadow-lg rounded-lg">
//         <h1 className="text-3xl font-bold mb-6 text-gray-800">ログイン</h1>
//         <button
//           onClick={() => signIn("google")}
//           className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-200"
//         >
//           Googleでログイン
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SignInPage;
"use client";

import { signIn } from "next-auth/react";

const SignInPageContent = () => {
  return (
    <div className="text-center p-8 bg-white shadow-lg rounded-lg mt-10">
      <p>aimit login</p>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">ログイン</h1>
      <button
        onClick={() => signIn("google")}
        className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-200"
      >
        Googleでログイン
      </button>
    </div>
  );
};

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <SignInPageContent />
    </div>
  );
};

export default SignInPage;
export { SignInPageContent }; // 再利用可能な形でエクスポート
