import { encodeURISlug } from '@/lib/utils/formatter';

const urlPath = {
  apiBlogSearch: (query: string) => `/api/blog/search?q=${encodeURIComponent(query)}`,
  blogPage: (pageNumber: number) => `/blog/page/${pageNumber}`,
  blogPost: (slug: string) => `/blog/post/${slug}`,
  blogTag: (tag: string) => `/blog/tags/${encodeURISlug(tag)}`,
  blogSeries: (series: string) => `/blog/series/${encodeURISlug(series)}`,
} as const;

export default urlPath;
