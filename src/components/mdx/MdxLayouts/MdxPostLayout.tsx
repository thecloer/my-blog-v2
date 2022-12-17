import type { FC, PropsWithChildren } from 'react';
import type { BlogMdxMetaData } from '@/types/data.type';
import Link from 'next/link';
import UtterancesComment from '@/components/UtterancesComment';
import TagContainer from '@/components/tag/TagContainer';
import MdxRenderer from '@/components/mdx/MdxRenderer';
import urlPath from '@/config/urlPath';
import { formatAsMinutes } from '@/lib/utils/formatter';
import InlineSidebarWrapper from '@/containers/InlineSidebarWrapper';
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
      <div className='mb-12 border-b-2 border-gray-200 pb-5 dark:border-gray-700'>
        {category === null || (
          <Link href={urlPath.blog.categories.param(category)}>
            <a className='cursor-pointer font-medium text-bgDark-500 hover:text-bgDark-600 dark:text-bgDark-400 hover:dark:text-bgDark-300'>
              {category}
            </a>
          </Link>
        )}
        <h1 className='mb-4 text-4xl font-extrabold'>{title}</h1>
        <div className='mb-3 flex gap-1 text-bgDark-500 dark:text-bgDark-400'>
          <span>{formattedDate}</span>
          <span className='flex items-center justify-center font-thin'>&bull;</span>
          <span>{formattedReadingTime}</span>
        </div>

        <div className='mt-3 flex flex-wrap '>
          <TagContainer tags={tags} type='link' />
        </div>
      </div>

      <InlineSidebarWrapper>
        <NestedToc toc={toc} />
      </InlineSidebarWrapper>

      <MdxRenderer mdxSource={mdxSource} />

      <UtterancesComment className='mt-8' />
    </article>
  );
};

export default MdxPostLayout;
