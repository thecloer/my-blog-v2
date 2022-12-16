import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import useIntersection from '@/hooks/useIntersection';
import { DownArrow, RightArrow } from '@/lib/svgs';

const InlineSidebarWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [showChildren, setShowChildren] = useState(false);
  const inlineSidebarRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersection(inlineSidebarRef);

  useEffect(() => {
    setShowChildren(false);
  }, [isIntersecting]);

  const toggleShowChildren = () => setShowChildren((prevShow) => !prevShow);

  return (
    <div className='relative z-10 mb-8 block lg:hidden' ref={inlineSidebarRef}>
      <button
        className={`flex h-10 w-full items-center gap-2 rounded-md px-3 text-lg font-medium ${
          showChildren ? 'bg-bgDark-200 dark:bg-bgDark-700' : 'bg-bgDark-300 dark:bg-bgDark-800'
        }`}
        onClick={toggleShowChildren}
      >
        <div className='flex h-full w-3 shrink-0 items-center justify-center'>
          {showChildren ? <DownArrow /> : <RightArrow />}
        </div>
        Menu
      </button>
      {showChildren && (
        <div className='absolute top-4 -z-10 w-full rounded-b-md bg-bgDark-200 px-5 pt-10 pb-5 dark:bg-bgDark-700'>
          {children}
        </div>
      )}
    </div>
  );
};

export default InlineSidebarWrapper;
