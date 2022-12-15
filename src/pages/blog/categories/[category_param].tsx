import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { BlogFrontMatterWithSlug } from '@/types/data.type';
import { Blog } from '@/repositories/blog';
import { decodeURISlug, encodeURISlug } from '@/lib/utils/formatter';
import AppWidthContainer from '@/containers/AppWidthContainer';
import PageTitle from '@/components/PageTitle';
import PostListWithPagination from '@/components/PostListWithPagination';
import NoPost from '@/components/SimpleView/NoPost';

type Props = {
  category: string;
  posts: BlogFrontMatterWithSlug[];
};

interface Params extends ParsedUrlQuery {
  category_param: string;
}

const CategoryPage: NextPage<Props> = ({ posts, category }) => {
  return (
    <AppWidthContainer>
      <PageTitle>{category}</PageTitle>
      <PostListWithPagination posts={posts} NoItemView={<NoPost />} />
    </AppWidthContainer>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = Blog.getAllCategories().map((category) => ({ params: { category_param: encodeURISlug(category) } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  if (params === undefined)
    return {
      redirect: {
        destination: '/blog',
        permanent: false,
      },
    };
  const category = decodeURISlug(params.category_param);

  const posts = Blog.getFrontMattersByCategory(category);

  return {
    props: {
      category,
      posts,
    },
  };
};

export default CategoryPage;