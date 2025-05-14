// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

// const WP_GRAPHQL_ENDPOINT =
//   process.env.WP_GRAPHQL_ENDPOINT || 'https://**/aimit/graphql';
const WP_GRAPHQL_ENDPOINT = process.env.WP_GRAPHQL_ENDPOINT;
if (!WP_GRAPHQL_ENDPOINT) {
  throw new Error("WP_GRAPHQL_ENDPOINT is not defined");
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        const { username, password } = credentials;

        // const loginRes = await fetch(WP_GRAPHQL_ENDPOINT, {
        //   method: 'POST',
        //   headers: {'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     query: `
        //       mutation LoginUser($username: String!, $password: String!) {
        //         login(input: { username: $username, password: $password }) {
        //           authToken
        //           user {
        //             id
        //             username
        //             email
        //             avatar {
        //               url
        //             }
        //             roles {
        //               nodes {
        //                 name
        //               }
        //             }
        //           }
        //         }
        //       }
        //     `,
        //     variables: { username, password },
        //   }),
        // });
        const loginRes = await fetch(WP_GRAPHQL_ENDPOINT, {
          method: 'POST',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              mutation LoginUser($username: String!, $password: String!) {
                login(input: { username: $username, password: $password }) {
                  authToken
                  user {
                    id
                    username
                    email
                    meta {
                      avatar
                    }
                    roles {
                      nodes {
                        name
                      }
                    }
                  }
                }
              }
            `,
            variables: { username, password },
          }),
        });

        const loginJson = await loginRes.json();
        const user = loginJson?.data?.login?.user;
        const authToken = loginJson?.data?.login?.authToken;

        if (!authToken || !user) {
          throw new Error('ログインに失敗しました');
        }

        // const avatarUrl = user?.avatar?.url ?? null;
        const avatarUrl = user?.meta?.avatar ?? null; // ← meta 経由で取得！

        const roles = user?.roles?.nodes ?? [];
        const wpRole = roles.length > 0 ? roles[0].name.toLowerCase() : 'guest';
        const roleName = wpRole === 'administrator' ? 'admin' : wpRole;

        return {
          id: user.id,
          name: user.username,
          email: user.email ?? '',
          image: avatarUrl,
          avatar: avatarUrl,
          token: authToken,
          provider: 'credentials',
          role: roleName,
        };
      },
    }),
  ],

  pages: {
    signIn: '/auth/signin',
  },

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.provider = account.provider;
      }
  
      if (user) {
        if (user.token) {
          token.token = user.token;
          token.accessToken = user.token; // ✅ これを追加！
        }
        if (user.image) token.image = user.image;
        if (user.id) token.id = user.id;
        if (typeof user.role === 'string') {
          token.role = user.role;
        } else if (user.role && typeof user.role === 'object' && 'name' in user.role) {
          token.role = user.role.name;
        }
      }
  
      return token;
    },
  
    async session({ session, token }) {
      if (session.user) {
        session.user.token = token.accessToken as string;
        session.user.provider = token.provider as string;
        session.user.token = token.token as string;
        session.user.image = typeof token.image === 'string' ? token.image : null;
        session.user.id = token.id as string;
        session.user.role = token.role ?? 'guest';
  
        // ✨ ここで管理者に昇格処理
        if (session.user.email === "moriyori10@gmail.com") {
          session.user.role = "admin";
        }
      }
      return session;
    },
  },
  
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export default handler;
