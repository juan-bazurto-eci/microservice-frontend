import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await fetch(`${process.env.NEXT_PUBLIC_POSTS_URL}/posts`);
  const data = await result.json();

  if (!data) {
    return res.status(400).json({ error: "No data found" });
  }

  return res.status(200).json(data);
}
