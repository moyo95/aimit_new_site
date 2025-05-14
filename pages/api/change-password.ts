// pages/api/change-password.ts

import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const WP_GRAPHQL_ENDPOINT = process.env.WP_GRAPHQL_ENDPOINT!;
const JWT_SECRET = process.env.JWT_SECRET!; // WPと一致するキー

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized or Missing Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  let decoded: any;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error("JWT検証エラー:", err);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }

  const graphqlUserId = decoded?.data?.user?.id; // dXNlcjo2 などの Base64形式

  if (!graphqlUserId) {
    return res.status(400).json({ success: false, message: "Invalid token payload" });
  }

  const { newPassword } = req.body;

  if (!newPassword || typeof newPassword !== "string") {
    return res.status(400).json({ success: false, message: "Invalid or missing newPassword" });
  }

  try {
    const graphqlRes = await fetch(WP_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // WordPress JWTトークン
      },
      body: JSON.stringify({
        query: `
          mutation UpdateUserPassword($input: UpdateUserInput!) {
            updateUser(input: $input) {
              user {
                id
                email
              }
            }
          }
        `,
        variables: {
          input: {
            id: graphqlUserId, // ✅ Base64 ID (e.g., dXNlcjo2)
            password: newPassword,
          },
        },
      }),
    });

    const json = await graphqlRes.json();
    // console.log("GraphQL Response:", JSON.stringify(json, null, 2));

    if (json.errors) {
      console.error("GraphQL Errors:", json.errors);
      return res.status(500).json({
        success: false,
        message: "GraphQL error",
        errors: json.errors,
      });
    }

    return res.status(200).json({
      success: true,
      message: "パスワードが変更されました",
      data: json.data,
    });
  } catch (error) {
    console.error("エラー:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
