import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { BlogFrontMatterWithSlug } from '@/types/data.type';
import urlPath from '@/config/urlPath';
import { Blog, UNCATEGORIZED_POSTS } from '@/repositories/blog';
import { decodeURISlug, encodeURISlug } from '@/lib/utils/formatter';
import { hoistItem } from '@/lib/utils/sorter';
import ContentWithSidebarLayout from '@/layouts/ContentWithSidebarLayout';
import AppWidthContainer from '@/containers/AppWidthContainer';
import PostListWithPagination from '@/components/PostListWithPagination';
import CategoriesSidebar from '@/components/sidebar/CategoriesSidebar';
import PageTitle from '@/components/PageTitle';
import NoPost from '@/components/SimpleView/NoPost';

type Props = {
  category: string;
  posts: BlogFrontMatterWithSlug[];
  categories: string[];
};

interface Params extends ParsedUrlQuery {
  category_param: string;
}

const CategoryPage: NextPage<Props> = ({ category, posts, categories }) => {
  return (
    <AppWidthContainer>
      <ContentWithSidebarLayout sidebar={<CategoriesSidebar categories={categories} selectedCategory={category} />}>
        <PageTitle>{category}</PageTitle>
        <PostListWithPagination posts={posts} NoItemView={<NoPost />} />
      </ContentWithSidebarLayout>
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
        destination: urlPath.blog.categories.param(UNCATEGORIZED_POSTS),
        permanent: false,
      },
    };

  const category = decodeURISlug(params.category_param);
  const allCategories = Blog.getAllCategories();
  const categories = hoistItem(allCategories, UNCATEGORIZED_POSTS);
  const posts = Blog.getFrontMattersByCategory(category);

  return {
    props: {
      category,
      posts,
      categories,
    },
  };
};

export default CategoryPage;
