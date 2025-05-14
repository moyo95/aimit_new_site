"use client";

import { FC } from "react";
// import { SignInPageContent } from "./SignInPageContent";
import { SignInPageContent } from "./SignInPageContent";

const SignInPage: FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <SignInPageContent />
    </div>
  );
};

export default SignInPage; // ページエントリとしてデフォルトエクスポート
