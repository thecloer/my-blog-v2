import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { BlogMdxMetaData } from '@/types/data.type';
import Blog from '@/repositories/blog';
import ContentWithSidebarLayout from '@/layouts/ContentWithSidebarLayout';
import AppWidthContainer from '@/containers/AppWidthContainer';
import UtterancesComment from '@/components/UtterancesComment';
import PostSidebar from '@/components/sidebar/PostSidebar';
import MdxRenderer from '@/components/mdx/MdxRenderer';

interface Props {
  mdxSource: string;
  mdxMeta: BlogMdxMetaData;
}
interface Params extends ParsedUrlQuery {
  slugs: string[];
}

const BlogPostPage: NextPage<Props> = ({ mdxSource, mdxMeta }) => {
  return (
    <AppWidthContainer>
      <ContentWithSidebarLayout sidebar={<PostSidebar toc={mdxMeta.toc} />}>
        <MdxRenderer mdxSource={mdxSource} />
        <UtterancesComment />
      </ContentWithSidebarLayout>
    </AppWidthContainer>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = Blog.getAllFrontMatters().map((frontMatter) => ({
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
  const slug = params!.slugs.join('/'); // FIXME: params!.slugs
  const MdxData = await Blog.getMdxDataBySlug(slug); //TODO: getMdxDataBySlug: No File Error

  return MdxData === null
    ? {
        redirect: {
          destination: '/blog',
          permanent: false,
        },
      }
    : {
        props: MdxData,
      };
};

export default BlogPostPage;
