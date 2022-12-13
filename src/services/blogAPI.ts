import type { BlogFrontMatterWithSlug } from '@/types/data.type';
import urlPath from '@/config/urlPath';

const searchPosts = (searchTerm: string): Promise<BlogFrontMatterWithSlug[]> =>
  fetch(urlPath.api.blog.search(searchTerm))
    .then((res) => res.json())
    .then((json) => json?.result ?? [])
    .catch(() => []);

const blogAPI = {
  searchPosts,
};

export default blogAPI;
