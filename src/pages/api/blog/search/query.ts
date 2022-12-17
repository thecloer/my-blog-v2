import type { NextApiRequest, NextApiResponse } from 'next';
import Blog from '@/repositories/blog';

export default async function searchHandler(req: NextApiRequest, res: NextApiResponse) {
  const searchQuery = req.query.q;
  if (searchQuery === undefined) return res.status(400).json({ result: [] });

  const term =
    typeof searchQuery === 'string'
      ? decodeURIComponent(searchQuery)
      : searchQuery.map((query) => decodeURIComponent(query));

  // TODO: search slice string by space and trim
  const result = Blog.search(term);

  return res.status(200).json({ result });
}
