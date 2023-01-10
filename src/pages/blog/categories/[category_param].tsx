import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { BlogFrontMatterWithSlug } from '@/types/data.type';
import siteMetadata from '@/config/siteMetadata';
import { decodeURISlug, encodeURISlug } from '@/lib/utils/formatter';
import Blog from '@/repositories/blog';
import ContentWithSidebarLayout from '@/layouts/ContentWithSidebarLayout';
import InlineSidebarWrapper from '@/containers/InlineSidebarWrapper';
import AppWidthContainer from '@/containers/AppWidthContainer';
import PageTitle from '@/containers/PageTitle';
import PostListWithPagination from '@/components/PostListWithPagination';
import CategoriesSidebar from '@/components/sidebar/CategoriesSidebar';
import { PageSEO } from '@/components/SEO';
import NoPost from '@/components/simpleViews/NoPost';

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
    <>
      <PageSEO
        title={`${category} | ${siteMetadata.title} | ${siteMetadata.author}`}
        description={`Blog category ${category}`}
      />

      <AppWidthContainer>
        <ContentWithSidebarLayout sidebar={<CategoriesSidebar categories={categories} selectedCategory={category} />}>
          <PageTitle>{category}</PageTitle>
          <InlineSidebarWrapper>
            <CategoriesSidebar categories={categories} selectedCategory={category} />
          </InlineSidebarWrapper>
          <PostListWithPagination posts={posts} NoItemView={<NoPost />} />
        </ContentWithSidebarLayout>
      </AppWidthContainer>
    </>
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
  const categories = Blog.getAllCategories();
  const category = decodeURISlug(params?.category_param ?? categories[0]);
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
