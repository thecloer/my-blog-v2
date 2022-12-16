import type { FC } from 'react';
import Link from 'next/link';
import urlPath from '@/config/urlPath';

type Props = {
  category: string;
  selected?: boolean;
};

const CategoryItem: FC<Props> = ({ category, selected = false }) => {
  return (
    <li className='mb-1 text-lg font-medium last:mb-0'>
      {selected ? (
        <a className='flex cursor-default text-primary-500'>
          <span className='mr-1 flex h-7 w-4 shrink-0 items-center justify-center'>-</span>
          {category}
        </a>
      ) : (
        <Link key={category} href={urlPath.blog.categories.param(category)}>
          <a className='flex hover:text-primary-500'>
            <span className='mr-1 flex h-7 w-4 shrink-0 items-center justify-center text-xs'>&bull;</span>
            {category}
          </a>
        </Link>
      )}
    </li>
  );
};

export default CategoryItem;
