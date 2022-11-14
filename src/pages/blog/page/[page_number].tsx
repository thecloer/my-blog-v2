import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { BlogFrontMatterWithSlug } from '@/types/types';
import { POSTS_PER_PAGE } from '@/config/layoutConfig';
import { Blog } from '@/repositories/blog';
import BlogSidebar from '@/components/sidebar/BlogSidebar';
import PostList from '@/components/PostList';
import Pagination from '@/components/pagination/Pagination';
import BlogInlineSidebar from '@/components/sidebar/BlogInlineSidebar';

interface Props {
  displayPosts: BlogFrontMatterWithSlug[];
  currentPage: number;
  lastPage: number;
}

interface Params extends ParsedUrlQuery {
  page_number: string;
}

const BlogPage: NextPage<Props> = ({ displayPosts, currentPage, lastPage }) => {
  return (
    <div className='flex grow'>
      <BlogSidebar />
      <main className='mt-6 mb-8 grow'>
        <div className=''>
          <h1 className='mb-10 text-5xl font-extrabold'>All Posts: {displayPosts.length}</h1>
        </div>
        <BlogInlineSidebar />
        <PostList posts={displayPosts} />
        <Pagination currentPage={currentPage} lastPage={lastPage} />
      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const allPosts = Blog.instance.getAllFrontMatters();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({ params: { page_number: (i + 1).toString() } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const currentPage = params ? parseInt(params.page_number) : 1;
  const allPosts = Blog.instance.getAllFrontMatters();
  const displayPosts = allPosts.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage);
  const lastPage = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  return {
    props: {
      displayPosts,
      currentPage,
      lastPage,
    },
  };
};

export default BlogPage;
