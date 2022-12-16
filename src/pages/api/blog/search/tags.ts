import type { NextApiRequest, NextApiResponse } from 'next';
import Blog from '@/repositories/blog';

export default async function tagsHandler(req: NextApiRequest, res: NextApiResponse) {
  const searchQuery = req.query.tags;
  if (searchQuery === undefined) return res.status(400).json({ result: [] });

  const tags =
    typeof searchQuery === 'string'
      ? decodeURIComponent(searchQuery)
      : searchQuery.map((query) => decodeURIComponent(query));

  const result = Blog.getFrontMattersByTag(tags);

  return res.status(200).json({ result });
}
