import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "Google認証には GOOGLE_CLIENT_ID と GOOGLE_CLIENT_SECRET が必要です。" +
    "環境変数が正しく設定されているか確認してください。"
  );
}

  
  export default NextAuth({
    debug: true,
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID, // デフォルト値を除去
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, // デフォルト値を除去
      }),
    ],
    callbacks: {
      async redirect({ url, baseUrl }) {
        return baseUrl; // ホームへリダイレクト
      },
    },
    pages: {
      signIn: '/auth/signin', // ログインページ
      signOut: '/auth/signout', // ログアウトページ
      error: '/auth/error', // エラーページ
      verifyRequest: '/auth/verify-request', // 認証メール送信後のページ
      newUser: '/dashboard', // 初めてのログインユーザー向け
    },
  });
  