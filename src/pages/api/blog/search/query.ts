import type { NextApiRequest, NextApiResponse } from 'next';
import Blog from '@/repositories/blog';
import { parseSearchString } from '@/lib/utils/formatter';

export default async function searchHandler(req: NextApiRequest, res: NextApiResponse) {
  const searchQuery = req.query.q;
  if (searchQuery === undefined) return res.status(400).json({ result: [] });

  const searchTerm =
    typeof searchQuery === 'string'
      ? parseSearchString(searchQuery)
      : searchQuery.map((query) => parseSearchString(query)).flat();

  const result = Blog.search(searchTerm);

  return res.status(200).json({ result });
}
