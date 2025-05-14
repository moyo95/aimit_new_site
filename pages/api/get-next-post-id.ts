// pages/api/get-next-post-id.ts
import { NextApiRequest, NextApiResponse } from "next";

const WP_API_BASE = process.env.WP_API_BASE;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { currentId, direction } = req.query;
  const currentIdNumber = Number(currentId);

  if (!currentIdNumber || (direction !== "next" && direction !== "prev")) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    // 100件まで取得（必要に応じて per_page を増やす）
    const response = await fetch(`${WP_API_BASE}?per_page=100&orderby=date&order=asc&_fields=id,date`);
    const posts = await response.json();

    const index = posts.findIndex((post: any) => post.id === currentIdNumber);

    if (index === -1) {
      return res.status(404).json({ postId: null });
    }

    let targetId = null;
    if (direction === "next" && index < posts.length - 1) {
      targetId = posts[index + 1].id;
    } else if (direction === "prev" && index > 0) {
      targetId = posts[index - 1].id;
    }

    return res.status(200).json({ postId: targetId });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

