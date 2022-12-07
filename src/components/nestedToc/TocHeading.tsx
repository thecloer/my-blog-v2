import type { FC } from 'react';
import type { TocData } from '@/types/data.type';
import { useState } from 'react';
import NestedToc from './NestedToc';
import Link from 'next/link';
import { DownArrow, RightArrow } from '@/lib/svgs';

type Props = {
  heading: TocData;
};

const TocHeading: FC<Props> = ({ heading }) => {
  const [showChildren, setShowChildren] = useState(() => heading.depth < 3);

  // top level heading
  if (heading.depth === 1)
    return (
      <>
        <Link href={heading.url} scroll={false} replace>
          <a className='mb-4 block text-xl font-semibold text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'>
            {heading.text}
          </a>
        </Link>
        {heading.children.length > 0 ? (
          <div className='flex'>
            <button className='nested-collapse-line' />
            {showChildren ? <NestedToc toc={heading.children} /> : null}
          </div>
        ) : null}
      </>
    );

  // nested heading
  if (heading.children.length > 0)
    return (
      <>
        <div className='mb-2 flex'>
          <span
            className='sidebar-link mr-2 flex h-6 w-4 shrink-0 items-center justify-center'
            onClick={() => setShowChildren((prevShow) => !prevShow)}
          >
            {showChildren ? <DownArrow /> : <RightArrow />}
          </span>

          <Link href={heading.url} scroll={false} replace>
            <a className='sidebar-link' onClick={() => !showChildren && setShowChildren(true)}>
              {heading.text}
            </a>
          </Link>
        </div>

        {showChildren ? (
          <div className='flex'>
            <button className='nested-collapse-line' onClick={() => setShowChildren(false)} />
            <NestedToc toc={heading.children} />
          </div>
        ) : null}
      </>
    );

  // endpoint
  return (
    <Link href={heading.url} scroll={false} replace>
      <a className='sidebar-link mb-2 flex'>
        <span className='mr-2 flex h-6 w-4 shrink-0 items-center justify-center text-xs'>&bull;</span>
        {heading.text}
      </a>
    </Link>
  );
};

export default TocHeading;
