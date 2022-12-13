import type { NextApiRequest, NextApiResponse } from 'next';
import { Blog } from '@/repositories/blog';
import { decodeURISlug } from '@/lib/utils/formatter';

export default async function tagsHandler(req: NextApiRequest, res: NextApiResponse) {
  const searchQuery = req.query.tags;
  if (searchQuery === undefined) return res.status(400).json({ result: [] });

  const tags =
    typeof searchQuery === 'string' ? decodeURISlug(searchQuery) : searchQuery.map((query) => decodeURISlug(query));

  const result = Blog.getFrontMattersByTag(tags);

  return res.status(200).json({ result });
}
