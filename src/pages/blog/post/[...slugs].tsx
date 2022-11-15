import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import AppWidthContainer from '@/containers/AppWidthContainer';
import { Blog } from '@/repositories/blog';

interface Props {
  slugs: string[];
}
interface Params extends ParsedUrlQuery {
  slugs: string[];
}

const BlogPostPage: NextPage<Props> = ({ slugs }) => {
  return (
    <AppWidthContainer>
      <h1>Blog Post: {slugs}</h1>
    </AppWidthContainer>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = Blog.instance.getAllFrontMatters().map((frontMatter) => ({
    params: {
      slugs: frontMatter.slug.split('/'),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  return {
    props: {
      slugs: params!.slugs,
    },
  };
};

export default BlogPostPage;
