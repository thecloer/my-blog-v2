import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { BlogMdxMetaData } from '@/types/data.type';
import siteMetadata from '@/config/siteMetadata';
import Blog from '@/repositories/blog';
import ContentWithSidebarLayout from '@/layouts/ContentWithSidebarLayout';
import AppWidthContainer from '@/containers/AppWidthContainer';
import MdxPostLayout from '@/components/mdx/MdxLayouts/MdxPostLayout';
import PostSidebar from '@/components/sidebar/PostSidebar';
import { PostSEO } from '@/components/SEO';

interface Props {
  mdxSource: string;
  mdxMeta: BlogMdxMetaData;
}
interface Params extends ParsedUrlQuery {
  slugs: string[];
}

const BlogPostPage: NextPage<Props> = ({ mdxSource, mdxMeta }) => {
  return (
    <>
      <PostSEO
        title={`${mdxMeta.title} | ${siteMetadata.title} | ${siteMetadata.author}`}
        tags={mdxMeta.tags}
        ogImage={mdxMeta.thumbnail}
        description={mdxMeta.description}
      />
      <AppWidthContainer>
        <ContentWithSidebarLayout sidebar={<PostSidebar toc={mdxMeta.toc} />}>
          <MdxPostLayout mdxSource={mdxSource} mdxMeta={mdxMeta} />
        </ContentWithSidebarLayout>
      </AppWidthContainer>
    </>
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
          permanent: true,
        },
      }
    : {
        props: MdxData,
      };
};

export default BlogPostPage;
