import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { BlogMdxMetaData } from '@/types/data.type';
import { Blog } from '@/repositories/blog';
import AppWidthContainer from '@/containers/AppWidthContainer';
import MdxComponent from '@/components/mdx/MdxComponent';

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
      <MdxComponent mdxSource={mdxSource} />
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
  const slug = params!.slugs.join('/'); // FIXME: parmas!.slugs
  const MdxData = await Blog.instance.getMdxDataBySlug(slug);

  if (MdxData === null) {
    console.error(`Error in getStaticProps in [...slug].tsx: ${slug} doesn't exist.`);
    return {
      redirect: {
        destination: '/blog',
        permanent: false,
      },
    };
  }
  return {
    props: MdxData,
  };
};

export default BlogPostPage;
