import type { FC } from 'react';

type Props = {
  currentPageIndex: number;
  lastPageIndex: number;
  action: (index: number) => void;
};

const Pagination: FC<Props> = ({ currentPageIndex, lastPageIndex, action }) => {
  return (
    <div>
      Pagination
      <div>currentPageIndex: {currentPageIndex}</div>
      <div>lastPageIndex: {lastPageIndex}</div>
    </div>
  );
};

export default Pagination;
