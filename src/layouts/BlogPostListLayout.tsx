import type { BlogFrontMatterWithSlug } from '@/types/data.type';
import { type FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSearchContext } from '@/contexts/SearchContext';
import useDebounce from '@/hooks/useDebounce';
import SidebarLayout from '@/layouts/SidebarLayout';
import BlogInlineSidebar from '@/components/sidebar/BlogInlineSidebar';
import BlogSidebar from '@/components/sidebar/BlogSidebar';
import Pagination from '@/components/pagination/Pagination';
import PostList from '@/components/PostList';
import urlPath from '@/config/urlPath';

// TODO: another pagination for displayPosts when it is searched

type Props = {
  allPostNumber: number;
  initialDisplayPosts: BlogFrontMatterWithSlug[];
  currentPage: number;
  lastPage: number;
};

const BlogPostListLayout: FC<Props> = ({ allPostNumber, initialDisplayPosts, currentPage, lastPage }) => {
  const router = useRouter();
  const { searchString } = useSearchContext();
  const [searchResult, setSearchResult] = useState<BlogFrontMatterWithSlug[]>([]);

  const debouncedSearchTerm = useDebounce(searchString);
  const isInitialPage = debouncedSearchTerm.length < 2;
  const displayPosts = isInitialPage ? initialDisplayPosts : searchResult;

  useEffect(() => {
    if (isInitialPage) return;

    // TODO: API call
    const searchPosts = async () => {
      const res = await fetch(urlPath.apiBlogSearch(debouncedSearchTerm));
      const { result } = await res.json();
      setSearchResult(result);
    };
    searchPosts();
  }, [isInitialPage, debouncedSearchTerm]);

  const navigateBlogPage = (pageNum: number) => router.push(urlPath.blogPage(pageNum));

  return (
    <SidebarLayout sidebar={<BlogSidebar />}>
      <h1 className='mb-10 text-5xl font-extrabold'>
        {isInitialPage ? `All Posts: ${allPostNumber}` : `Results: ${searchResult.length}`}
      </h1>
      <BlogInlineSidebar />
      <PostList posts={displayPosts} />
      {
        // TODO: if (!isInitialPage), show pagination for searchResult
        isInitialPage ? <Pagination currentPage={currentPage} lastPage={lastPage} onClick={navigateBlogPage} /> : null
      }
    </SidebarLayout>
  );
};

export default BlogPostListLayout;
