import type { FC } from 'react';
import type { PaginationButtonType } from '@/types/utils.type';
import { getPaginationNumbers } from '@/lib/utils/helper';
import PaginationButton from './PaginationButton';

type Props = {
  currentPage: number;
  lastPage: number;
  onClick: (pageNum: number, type: PaginationButtonType) => void;
};

const Pagination: FC<Props> = ({ currentPage, lastPage, onClick }) => {
  const { paginationNumbers, hasNextButton, hasPreviousButton } = getPaginationNumbers(currentPage, lastPage);

  const onClickPaginationButton = (pageNum: number, type: PaginationButtonType) => {
    if (pageNum === currentPage || pageNum > lastPage) return;
    onClick(pageNum, type);
  };

  return (
    <nav aria-label='Page navigation' className='mt-12 flex w-full cursor-pointer justify-center'>
      <div
        className={`flex items-center divide-x-[1px] border dark:divide-bgDark-800 dark:border-bgDark-800
        ${hasPreviousButton ? 'rounded-l-lg' : ''}
        ${hasNextButton ? 'rounded-r-lg' : ''}
        `}
      >
        {paginationNumbers.map((pageNum, i) => {
          const type =
            i === 0 && hasPreviousButton
              ? 'Previous'
              : i === paginationNumbers.length - 1 && hasNextButton
              ? 'Next'
              : pageNum === currentPage
              ? 'current'
              : 'normal';
          return <PaginationButton key={i} pageNum={pageNum} type={type} onClick={onClickPaginationButton} />;
        })}
      </div>
    </nav>
  );
};

export default Pagination;
