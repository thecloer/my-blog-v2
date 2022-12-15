import type { FC } from 'react';
import type { TagInfo } from '@/types/data.type';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import TagContainer from '@/components/TagContainer';
import urlPath from '@/config/urlPath';

// TODO: blog tags, blog series
type Props = {
  allTags: TagInfo[];
  categories: string[];
  onSearchChange: (value: string) => void;
};

const BlogSidebar: FC<Props> = ({ allTags, categories, onSearchChange }) => {
  return (
    <>
      <section className='mb-6'>
        <SearchBar onChange={onSearchChange} />
      </section>
      <section className='mb-6'>
        <h3 className='mb-2 text-xl font-semibold'>Category</h3>
        <ul>
          {categories.map((category) => (
            <Link key={category} href={urlPath.blog.categories.param(category)}>
              <a className='mb-1 flex text-lg last:mb-0'>
                <span className='mr-1 flex h-7 w-4 shrink-0 items-center justify-center text-xs'>&bull;</span>
                <span className='font-medium hover:text-primary-500'>{category}</span>
              </a>
            </Link>
          ))}
        </ul>
      </section>
      <section>
        <h3 className='mb-2 text-xl font-semibold'>Tags</h3>
        <TagContainer tags={allTags} />
      </section>
    </>
  );
};

export default BlogSidebar;
