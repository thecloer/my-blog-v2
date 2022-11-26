import type { FC } from 'react';
import { getPaginationNumbers } from '@/lib/utils/helper';
import PaginationButton from './PaginationButton';

type Props = {
  currentPage: number;
  lastPage: number;
};

const Pagination: FC<Props> = ({ currentPage, lastPage }) => {
  const { paginationNumbers, hasNextButton, hasPreviousButton } = getPaginationNumbers(currentPage, lastPage);

  return (
    <nav aria-label='Page navigation' className='mt-12 flex w-full cursor-pointer justify-center'>
      <ul
        className={`flex items-center divide-x-[1px] border dark:divide-slate-800 dark:border-slate-800
        ${hasPreviousButton ? 'rounded-l-lg' : ''}
        ${hasNextButton ? 'rounded-r-lg' : ''}
        `}
      >
        {paginationNumbers.map((pageNum, i) => (
          <PaginationButton
            key={i}
            pageNum={pageNum}
            type={i === 0 && hasPreviousButton ? 'Previous' : i === paginationNumbers.length - 1 && hasNextButton ? 'Next' : pageNum === currentPage ? 'current' : 'normal'}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

// const gap = Math.floor(PAGINATION_LENGTH / 2);
// const sides = { left: Math.min(gap, currentPageIndex), right: Math.min(gap, lastPageIndex - currentPageIndex) };
// const SIDES_LENGTH = Math.min(PAGINATION_LENGTH - 1, lastPageIndex);
// while (sides.left + sides.right < SIDES_LENGTH) {
//   if (sides.left < gap) sides.right++;
//   else if (sides.right < gap) sides.left++;
// }
// const paginationNumbers = range(currentPageIndex - sides.left + 1, currentPageIndex + sides.right + 2);
// const isLeftButton = PAGINATION_LENGTH <= lastPageIndex && sides.left > gap - 1;
// const isRightButton = PAGINATION_LENGTH <= lastPageIndex && sides.right > gap - 1;
