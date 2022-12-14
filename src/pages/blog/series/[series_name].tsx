import type { FC } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { BlogFrontMatterWithSlug } from '@/types/data.type';
import { Blog } from '@/repositories/blog';
import { decodeURISlug, encodeURISlug } from '@/lib/utils/formatter';
import AppWidthContainer from '@/containers/AppWidthContainer';
import PageTitle from '@/components/PageTitle';
import PostListWithPagination from '@/components/PostListWithPagination';
import NoPost from '@/components/SimpleView/NoPost';

type Props = {
  seriesName: string;
  posts: BlogFrontMatterWithSlug[];
};

interface Params extends ParsedUrlQuery {
  series_name: string;
}

const SeriesNamePage: FC<Props> = ({ posts, seriesName }) => {
  return (
    <AppWidthContainer>
      <PageTitle>{seriesName}</PageTitle>
      <PostListWithPagination posts={posts} NoItemView={<NoPost />} />
    </AppWidthContainer>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = Blog.getAllSeries().map((series) => ({ params: { series_name: encodeURISlug(series) } }));
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
  const seriesName = decodeURISlug(params.series_name);

  const posts = Blog.getFrontMattersBySeries(seriesName);

  return {
    props: {
      seriesName,
      posts,
    },
  };
};

export default SeriesNamePage;
