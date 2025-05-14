// //lib/graphql/registerUser.ts
// export async function registerUser({ username, email, password }: { username: string; email: string; password: string }) {
//     const response = await fetch("https://zeon-ad.sakura.ne.jp/aimit/graphql", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         query: `
//           mutation RegisterUser {
//             registerUser(input: {
//               username: "${username}",
//               email: "${email}",
//               password: "${password}"
//             }) {
//               user {
//                 id
//                 username
//                 email
//               }
//             }
//           }
//         `,
//       }),
//     });
  
//     const json = await response.json();
  
//     if (json.errors) {
//       throw new Error(json.errors[0].message);
//     }
  
//     return json.data.registerUser.user;
//   }

// lib/graphql/registerUser.ts
export async function registerUser({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) {
  const response = await fetch(process.env.WP_GRAPHQL_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation RegisterUser {
          registerUser(input: {
            username: "${username}",
            email: "${email}",
            password: "${password}"
          }) {
            user {
              id
              username
              email
            }
          }
        }
      `,
    }),
  });

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data.registerUser.user;
}
