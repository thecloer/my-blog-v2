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
    <div className='mb-8 block lg:hidden' ref={inlineSidebarRef}>
      <button
        className={
          'relative z-10 flex h-10 w-full items-center gap-2 rounded-md border-2 border-bgDark-400 bg-bgDark-300 px-3 text-lg font-medium dark:border-bgDark-600 dark:bg-bgDark-800'
        }
        onClick={toggleShowChildren}
      >
        <div className='flex h-full w-3 shrink-0 items-center justify-center'>
          {showChildren ? <DownArrow /> : <RightArrow />}
        </div>
        Menu
      </button>

      {showChildren && (
        <div
          className={
            'relative z-0 -mb-10 w-full -translate-y-10 rounded-md border-2 border-bgDark-400 bg-bgDark-100 px-5 pt-14 pb-5 shadow-lg dark:border-bgDark-600 dark:bg-bgDark-900'
          }
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default InlineSidebarWrapper;
