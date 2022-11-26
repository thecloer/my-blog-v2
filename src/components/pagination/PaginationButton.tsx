import type { FC } from 'react';
import Link from 'next/link';
import { NextArrow, PreviousArrow } from '@/lib/svgs';

interface Props {
  type: 'current' | 'normal' | 'Previous' | 'Next';
  pageNum: number;
}

const PaginationButton: FC<Props> = ({ type, pageNum }) => {
  return (
    <li>
      <Link href={`/blog/page/${pageNum}`} passHref>
        <a
          className={`flex h-9 w-9 items-center justify-center text-lg leading-none hover:bg-primary-400 dark:hover:bg-primary-500
          ${type === 'current' ? ' bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-white' : type === 'Previous' ? `rounded-l-lg` : type === 'Next' ? `rounded-r-lg` : ''}
          `}
        >
          {type === 'current' || type === 'normal' ? (
            pageNum
          ) : (
            <>
              <span className='sr-only'>{type}</span>
              {type === 'Previous' ? <PreviousArrow className='h-5 w-5' /> : <NextArrow className='h-5 w-5' />}
            </>
          )}
        </a>
      </Link>
    </li>
  );
};

export default PaginationButton;
