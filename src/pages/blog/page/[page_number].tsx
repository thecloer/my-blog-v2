import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { BlogFrontMatterWithSlug, TagInfo } from '@/types/data.type';
import { memo, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { POSTS_PER_PAGE } from '@/config/layoutConfig';
import urlPath from '@/config/urlPath';
import { Blog } from '@/repositories/blog';
import ContentWithSidebarLayout from '@/layouts/ContentWithSidebarLayout';
import AppWidthContainer from '@/containers/AppWidthContainer';
import BlogInlineSidebar from '@/components/sidebar/BlogInlineSidebar';
import PostListWithPagination from '@/components/PostListWithPagination';
import BlogSidebar from '@/components/sidebar/BlogSidebar';
import Pagination from '@/components/pagination/Pagination';
import PostList from '@/components/PostList';
import NoPost from '@/components/SimpleView/NoPost';
import PageTitle from '@/components/PageTitle';

const MemorizedSidebar = memo(BlogSidebar);

type Props = {
  allPostNumber: number;
  posts: BlogFrontMatterWithSlug[];
  currentPage: number;
  lastPage: number;
  allTags: TagInfo[];
  series: string[];
};

interface Params extends ParsedUrlQuery {
  page_number: string;
}

const BlogPage: NextPage<Props> = ({ allPostNumber, posts, currentPage, lastPage, allTags, series }) => {
  const router = useRouter();
  const [isInitialPage, setIsInitialPage] = useState(true);
  const [searchString, setSearchString] = useState<string>('');
  const [displayPosts, setDisplayPosts] = useState<BlogFrontMatterWithSlug[]>(posts);

  useEffect(() => {
    if (searchString.length < 2) {
      setIsInitialPage(true);
      setDisplayPosts(posts);
      return;
    }

    // TODO: API call
    const searchPosts = async () => {
      const res = await fetch(urlPath.api.blog.search.query(searchString));
      const { result } = await res.json();
      setDisplayPosts(result);
      setIsInitialPage(false);
    };
    searchPosts();
  }, [isInitialPage, searchString, posts]);

  const navigateBlogPage = (pageNum: number) => router.push(urlPath.blog.page(pageNum));

  return (
    <AppWidthContainer>
      <ContentWithSidebarLayout
        sidebar={<MemorizedSidebar allTags={allTags} series={series} onSearchChange={setSearchString} />}
      >
        <PageTitle>{isInitialPage ? `All Posts: ${allPostNumber}` : `Results: ${displayPosts.length}`}</PageTitle>

        <BlogInlineSidebar />

        {isInitialPage ? (
          <>
            <PostList posts={displayPosts} NoItemView={<NoPost />} />
            <Pagination currentPage={currentPage} lastPage={lastPage} onClick={navigateBlogPage} />
          </>
        ) : (
          <PostListWithPagination posts={displayPosts} NoItemView={<NoPost />} />
        )}
      </ContentWithSidebarLayout>
    </AppWidthContainer>
  );
};
// TODO: if (!isInitialPage), show pagination for DisplayPosts
// TODO: No Posts View

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const allPostNumber = Blog.getAllFrontMatters().length;
  const totalPages = Math.ceil(allPostNumber / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({ params: { page_number: (i + 1).toString() } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const currentPage = params ? parseInt(params.page_number) : 1;
  const allPosts = Blog.getAllFrontMatters();
  const allPostNumber = allPosts.length;
  const posts = allPosts.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage);
  const lastPage = Math.ceil(allPostNumber / POSTS_PER_PAGE);

  const allTags = Blog.getAllTags();
  const series = Blog.getAllSeries();

  return {
    props: {
      allPostNumber,
      posts,
      currentPage,
      lastPage,
      allTags,
      series,
    },
  };
};

export default BlogPage;
