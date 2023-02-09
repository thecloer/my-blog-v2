import type { FC } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import siteMetadata from '@/config/siteMetadata';

type CommonSEOProps = {
  title: string;
  description: string;
  ogType: string;
  ogImage?: string;
};

const CommonSEO: FC<CommonSEOProps> = ({ title, description, ogType, ogImage }) => {
  const router = useRouter();
  return (
    <Head>
      <title>{title}</title>
      <meta name='robots' content='follow, index' />
      <meta name='title' content={title} />
      <meta name='description' content={description} />
      <meta name='author' content={siteMetadata.author} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={`${siteMetadata.siteUrl}${router.asPath}`} />
      <meta property='og:site_name' content={siteMetadata.title} />
      <meta property='og:type' content={ogType} />
      <meta property='og:image' content={ogImage ?? siteMetadata.ogImage} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />

      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:site' content={siteMetadata.twitter} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:image' content={ogImage ?? siteMetadata.ogImage} />
    </Head>
  );
};

type PageSEOProps = {
  title: string;
  description: string;
};
export const PageSEO: FC<PageSEOProps> = ({ title, description }) => {
  return <CommonSEO title={title} description={description} ogType='website' />;
};

type PostSEOProps = {
  title: string;
  description: string;
  tags: string[] | null;
  ogImage: string;
};
export const PostSEO: FC<PostSEOProps> = ({ title, description, tags, ogImage }) => {
  return (
    <>
      <CommonSEO
        title={title}
        description={description}
        ogType='article'
        ogImage={ogImage?.length ? ogImage : undefined}
      />
      <Head>{tags && <meta name='keywords' content={tags.join(', ')} />}</Head>
    </>
  );
};
