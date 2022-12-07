import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { BlogFrontMatterWithSlug } from '@/types/data.type';
import BlogPostListLayout from '@/layouts/BlogPostListLayout';
import { SearchProvider } from '@/contexts/SearchContext';
import AppWidthContainer from '@/containers/AppWidthContainer';
import { POSTS_PER_PAGE } from '@/config/layoutConfig';
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
  return (
    <AppWidthContainer>
      <SearchProvider>
        <BlogPostListLayout
          allPostNumber={allPostNumber}
          initialDisplayPosts={initialDisplayPosts}
          currentPage={currentPage}
          lastPage={lastPage}
        />
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
