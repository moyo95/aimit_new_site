// import NextAuth, { DefaultSession } from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     accessToken?: string;
//   }
// }

// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      token?: string; // ← 追加
      provider?: string;
      role?: string;
    };
  }

  interface User {
    id: string;
    email?: string | null;
    token?: string;
    provider?: string;
    avatar: {
      url: string;
    };
    role?: string | { name: string }; // ← 修正：union 型にする
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email?: string | null;
    token?: string; // ← 追加
    provider?: string;
    image?: string;
    role?: string;
  }
}

