import type { FC } from 'react';
import Link from 'next/link';
import urlPath from '@/config/urlPath';

type Props = {
  name: string;
  count?: number;
};

const TagLink: FC<Props> = ({ name, count }) => {
  return (
    <Link href={urlPath.blog.tags.query([name])}>
      <a className='rounded bg-primary-400 px-1 py-[2px] text-sm hover:bg-primary-300 dark:bg-primary-500 dark:text-bgDark-800 hover:dark:bg-primary-400'>
        {name}
        {count !== undefined ? <span className='ml-1 text-xs'>{`(${count})`}</span> : null}
      </a>
    </Link>
  );
};

export default TagLink;
