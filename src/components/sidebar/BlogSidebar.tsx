import type { FC } from 'react';
import type { TagInfo } from '@/types/data.type';
import SearchBar from '@/components/SearchBar';
import TagContainer from '@/components/TagContainer';
import Link from 'next/link';
import urlPath from '@/config/urlPath';

// TODO: blog tags, blog series
type Props = {
  tags: TagInfo[];
  series: string[];
};

const BlogSidebar: FC<Props> = ({ tags, series }) => {
  return (
    <>
      <SearchBar />
      <section className='mb-6'>
        <h3 className='mb-2 text-xl font-semibold'>Series</h3>
        <ul>
          {series.map((seriesName) => (
            <Link key={seriesName} href={urlPath.blogSeries(seriesName)}>
              <a className='mb-1 flex text-lg last:mb-0'>
                <span className='mr-1 flex h-7 w-4 shrink-0 items-center justify-center text-xs'>&bull;</span>
                <span className='font-medium hover:text-primary-500'>{seriesName}</span>
              </a>
            </Link>
          ))}
        </ul>
      </section>
      <section>
        <h3 className='mb-2 text-xl font-semibold'>Tags</h3>
        <TagContainer tags={tags} />
      </section>
    </>
  );
};

export default BlogSidebar;
