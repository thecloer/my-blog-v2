import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { BlogFrontMatterWithSlug } from '@/types/data.type';
import urlPath from '@/config/urlPath';
import { Blog, UNCATEGORIZED_POSTS } from '@/repositories/blog';
import { decodeURISlug, encodeURISlug } from '@/lib/utils/formatter';
import ContentWithSidebarLayout from '@/layouts/ContentWithSidebarLayout';
import InlineSidebarWrapper from '@/containers/InlineSidebarWrapper';
import AppWidthContainer from '@/containers/AppWidthContainer';
import PageTitle from '@/containers/PageTitle';
import PostListWithPagination from '@/components/PostListWithPagination';
import CategoriesSidebar from '@/components/sidebar/CategoriesSidebar';
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
        <InlineSidebarWrapper>
          <CategoriesSidebar categories={categories} selectedCategory={category} />
        </InlineSidebarWrapper>
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
  const posts = Blog.getFrontMattersByCategory(category);
  const categories = Blog.getAllCategories();

  return {
    props: {
      category,
      posts,
      categories,
    },
  };
};

export default CategoryPage;
