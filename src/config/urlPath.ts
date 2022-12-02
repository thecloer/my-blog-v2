const urlPath = {
  apiBlogSearch: (query: string) => `/api/blog/search?q=${encodeURIComponent(query)}`,
  blogPage: (page_number: number) => `/blog/page/${page_number}`,
  blogPost: (slug: string) => `/blog/post/${slug}`,
  blogTag: (tag: string) => `/blog/tag/${tag}`,
  blogSeries: (series: string) => `/blog/series/${series}`,
} as const;

export default urlPath;
