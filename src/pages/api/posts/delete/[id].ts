import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_POSTS_URL}/posts/${req.query.id}`,
    {
      method: "DELETE",
    }
  );
  if (!result.ok) {
    return res.status(result.status).json({ error: await result.text() });
  }

  const data = await result.json();

  return res.status(200).json(data);
}
