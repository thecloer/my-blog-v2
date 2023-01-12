import type { FC } from 'react';

type Props = {
  name: string;
  count?: number;
  onClick?: (name: string, count?: number) => void;
};

const TagButton: FC<Props> = ({ name, count, onClick }) => {
  return (
    <button
      aria-label='tag button'
      className='flex items-center gap-1 rounded bg-bgDark-100 px-1 py-[2px] text-sm hover:bg-primary-400 dark:bg-bgDark-600 dark:hover:bg-primary-500 hover:dark:text-bgDark-800'
      onClick={() => onClick?.(name, count)}
    >
      {name}
      {count !== undefined ? <span className='text-xs'>{`(${count})`}</span> : null}
    </button>
  );
};

export default TagButton;
