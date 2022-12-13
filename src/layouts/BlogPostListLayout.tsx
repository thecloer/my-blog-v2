import type { BlogFrontMatterWithSlug, TagInfo } from '@/types/data.type';
import React, { type FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSearchContext } from '@/contexts/SearchContext';
import ContentWithSidebarLayout from '@/layouts/ContentWithSidebarLayout';
import BlogInlineSidebar from '@/components/sidebar/BlogInlineSidebar';
import BlogSidebar from '@/components/sidebar/BlogSidebar';
import Pagination from '@/components/pagination/Pagination';
import PostList from '@/components/PostList';
import urlPath from '@/config/urlPath';

const MemorizedSidebar = React.memo(BlogSidebar);

type Props = {
  allPostNumber: number;
  initialDisplayPosts: BlogFrontMatterWithSlug[];
  currentPage: number;
  lastPage: number;
  tags: TagInfo[];
  series: string[];
};

const BlogPostListLayout: FC<Props> = ({ allPostNumber, initialDisplayPosts, currentPage, lastPage, tags, series }) => {
  const router = useRouter();
  const { value: searchString } = useSearchContext<string>();
  const [searchResult, setSearchResult] = useState<BlogFrontMatterWithSlug[]>([]);

  const isInitialPage = searchString === null || searchString.length < 2;
  const displayPosts = isInitialPage ? initialDisplayPosts : searchResult;

  useEffect(() => {
    if (isInitialPage) return;

    // TODO: API call
    const searchPosts = async () => {
      const res = await fetch(urlPath.api.blog.search.query(searchString));
      const { result } = await res.json();
      setSearchResult(result);
    };
    searchPosts();
  }, [isInitialPage, searchString]);

  const navigateBlogPage = (pageNum: number) => router.push(urlPath.blog.page(pageNum));

  return (
    <ContentWithSidebarLayout sidebar={<MemorizedSidebar tags={tags} series={series} />}>
      <h1 className='mb-10 text-5xl font-extrabold'>
        {isInitialPage ? `All Posts: ${allPostNumber}` : `Results: ${searchResult.length}`}
      </h1>
      <BlogInlineSidebar />
      <PostList posts={displayPosts} />
      {
        // TODO: if (!isInitialPage), show pagination for searchResult
        isInitialPage ? <Pagination currentPage={currentPage} lastPage={lastPage} onClick={navigateBlogPage} /> : null
      }
    </ContentWithSidebarLayout>
  );
};

export default BlogPostListLayout;
