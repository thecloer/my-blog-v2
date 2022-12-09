import type { FC } from 'react';
import type { PaginationButtonType } from '@/types/utils.type';
import { NextArrow, PreviousArrow } from '@/lib/svgs';

interface Props {
  type: PaginationButtonType;
  pageNum: number;
  onClick: (pageNum: number, type: PaginationButtonType) => void;
}

const PaginationButton: FC<Props> = ({ type, pageNum, onClick }) => {
  return (
    <button
      onClick={() => onClick(pageNum, type)}
      className={`flex h-9 w-9 items-center justify-center text-lg leading-none hover:bg-primary-400 dark:hover:bg-primary-500
          ${
            type === 'current'
              ? ' bg-bgDark-200 text-slate-700 dark:bg-bgDark-800 dark:text-white'
              : type === 'Previous'
              ? `rounded-l-lg`
              : type === 'Next'
              ? `rounded-r-lg`
              : ''
          }
          `}
    >
      {type === 'current' || type === 'normal' ? (
        pageNum
      ) : (
        <>
          <span className='sr-only'>{`pagination ${type} button`}</span>
          {type === 'Previous' ? <PreviousArrow className='h-5 w-5' /> : <NextArrow className='h-5 w-5' />}
        </>
      )}
    </button>
  );
};

export default PaginationButton;
