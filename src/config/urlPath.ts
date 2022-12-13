import { encodeURISlug } from '@/lib/utils/formatter';

const urlPath = {
  root: '/',
  blog: {
    index: '/blog',
    page: (pageNumber: number) => `/blog/page/${pageNumber}`,
    posts: (slug: string) => `/blog/posts/${slug}`,
    tags: (tags: string[]) => `/blog/tags?${tags.map((tag) => `tags=${encodeURISlug(tag)}`).join('&')}`,
    series: (series: string) => `/blog/series/${encodeURISlug(series)}`,
  },
  api: {
    blog: {
      search: {
        query: (query: string) => `/api/blog/search/query?q=${encodeURIComponent(query)}`,
        tags: (tags: string[]) => `/api/blog/search/tags?${tags.map((tag) => `tags=${encodeURISlug(tag)}`).join('&')}`,
      },
    },
  },
} as const;

export default urlPath;
