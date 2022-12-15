import { encodeURISlug } from '@/lib/utils/formatter';

const urlPath = {
  root: '/',
  blog: {
    index: '/blog',
    page: (pageNumber: number) => `/blog/page/${pageNumber}`,
    posts: (slug: string) => `/blog/posts/${slug}`,
    tags: {
      index: '/blog/tags',
      query: (tags: string[]) => `/blog/tags?${tags.map((tag) => `tags=${encodeURISlug(tag)}`).join('&')}`,
    },
    categories: {
      index: '/blog/categories',
      param: (category: string) => `/blog/categories/${encodeURISlug(category)}`,
    },
  },
  api: {
    blog: {
      search: {
        query: (query: string) => `/api/blog/search/query?q=${encodeURIComponent(query)}`,
        tags: (tags: string[]) =>
          `/api/blog/search/tags?${tags.map((tag) => `tags=${encodeURIComponent(tag)}`).join('&')}`,
      },
    },
  },
} as const;

export default urlPath;
