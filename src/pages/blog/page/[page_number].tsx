import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { BlogFrontMatterWithSlug } from '@/types/data.type';
import { useEffect, useState } from 'react';
import AppWidthContainer from '@/containers/AppWidthContainer';
import BlogSidebar from '@/components/sidebar/BlogSidebar';
import BlogInlineSidebar from '@/components/sidebar/BlogInlineSidebar';
import PostList from '@/components/PostList';
import Pagination from '@/components/pagination/Pagination';
import { SearchProvider, useSearchContext } from '@/contexts/searchContext';
import useDebounce from '@/hooks/useDebounce';
import { POSTS_PER_PAGE } from '@/config/layoutConfig';
import urlPath from '@/config/urlPath';
import { Blog } from '@/repositories/blog';

type Props = {
  allPostNumber: number;
  initialDisplayPosts: BlogFrontMatterWithSlug[];
  currentPage: number;
  lastPage: number;
};

interface Params extends ParsedUrlQuery {
  page_number: string;
}

const BlogPage: NextPage<Props> = ({ allPostNumber, initialDisplayPosts, currentPage, lastPage }) => {
  const { searchString } = useSearchContext();
  const [searchResult, setSearchResult] = useState<BlogFrontMatterWithSlug[]>([]);

  const debouncedSearchTerm = useDebounce(searchString);
  const isInitialPage = debouncedSearchTerm.length < 2;
  const displayPosts = isInitialPage ? initialDisplayPosts : searchResult;

  useEffect(() => {
    if (isInitialPage) return;
    const searchPosts = async () => {
      const res = await fetch(urlPath.apiBlogSearch(encodeURIComponent(debouncedSearchTerm)));
      const { result } = await res.json();
      setSearchResult(result);
    };
    searchPosts();
  }, [isInitialPage, debouncedSearchTerm]);

  return (
    <AppWidthContainer>
      <SearchProvider>
        <div className='flex'>
          <BlogSidebar />
          <main className='mt-6 mb-8 grow'>
            <h1 className='mb-10 text-5xl font-extrabold'>{isInitialPage ? `All Posts: ${allPostNumber}` : `Results: ${searchResult.length}`}</h1>
            <BlogInlineSidebar />
            <PostList posts={displayPosts} />
            {isInitialPage ? <Pagination currentPage={currentPage} lastPage={lastPage} /> : null}
          </main>
        </div>
      </SearchProvider>
    </AppWidthContainer>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const allPostNumber = Blog.instance.getAllFrontMatters().length;
  const totalPages = Math.ceil(allPostNumber / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({ params: { page_number: (i + 1).toString() } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const currentPage = params ? parseInt(params.page_number) : 1;
  const allPosts = Blog.instance.getAllFrontMatters();
  const allPostNumber = allPosts.length;
  const initialDisplayPosts = allPosts.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage);
  const lastPage = Math.ceil(allPostNumber / POSTS_PER_PAGE);

  return {
    props: { allPostNumber, initialDisplayPosts, currentPage, lastPage },
  };
};

export default BlogPage;
