import type { FC, PropsWithChildren } from 'react';
import type { BlogMdxMetaData } from '@/types/data.type';
import Link from 'next/link';
import urlPath from '@/config/urlPath';
import { formatAsMinutes } from '@/lib/utils/formatter';
import InlineSidebarWrapper from '@/containers/InlineSidebarWrapper';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import UtterancesComment from '@/components/UtterancesComment';
import TagContainer from '@/components/tag/TagContainer';
import MdxRenderer from '@/components/mdx/MdxRenderer';
import NestedToc from '@/components/nestedToc/NestedToc';

type Props = {
  mdxSource: string;
  mdxMeta: BlogMdxMetaData;
};

const MdxPostLayout: FC<PropsWithChildren<Props>> = ({
  mdxSource,
  mdxMeta: { title, description, tags, category, date, toc, readingTime, thumbnail },
}) => {
  const formattedDate = Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
  const formattedReadingTime = formatAsMinutes(readingTime.minutes);

  return (
    <article className='mx-auto max-w-[650px]'>
      <div className='mb-12 border-b-2 border-gray-200 pb-8 dark:border-gray-700'>
        {category === null || (
          <Link href={urlPath.blog.categories.param(category)}>
            <a className='cursor-pointer font-medium text-bgDark-500 hover:text-bgDark-600 dark:text-bgDark-400 hover:dark:text-bgDark-300'>
              {category}
            </a>
          </Link>
        )}
        <h1 className='mb-4 text-4xl font-extrabold'>{title}</h1>
        <div className='mb-2 flex gap-1 text-bgDark-500 dark:text-bgDark-400'>
          <span>{formattedDate}</span>
          <span className='flex items-center justify-center font-thin'>&bull;</span>
          <span>{formattedReadingTime}</span>
        </div>

        <TagContainer tags={tags} type='link' />
      </div>

      <InlineSidebarWrapper>
        <NestedToc toc={toc} />
      </InlineSidebarWrapper>

      <MdxRenderer mdxSource={mdxSource} />

      <ScrollTopAndComment />
      <UtterancesComment className='mt-8' />
    </article>
  );
};

export default MdxPostLayout;
