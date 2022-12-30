import { useEffect, useState } from 'react';
import siteMetadata from '@/config/siteMetadata';

const ScrollTopAndComment = ({}) => {
  const [showButtons, setShowButtons] = useState(false);
  useEffect(() => {
    const handleShowButtons = () => (window.scrollY > 170 ? setShowButtons(true) : setShowButtons(false));

    window.addEventListener('scroll', handleShowButtons);
    return () => window.removeEventListener('scroll', handleShowButtons);
  }, []);

  if (!showButtons) return null;

  const scrollToTop = () => window.scrollTo({ top: 0 });
  const scrollToComment = () => document.getElementById(siteMetadata.comment.id)?.scrollIntoView();

  return (
    <div className='fixed right-8 bottom-8 hidden flex-col gap-3 sm:flex'>
      <button
        onClick={scrollToTop}
        className='flex items-center justify-center rounded-full bg-bgDark-200 p-2 text-bgDark-500 hover:bg-bgDark-300 dark:bg-bgDark-700 dark:text-bgDark-400 hover:dark:bg-bgDark-600'
      >
        <svg className='h-4 w-4' viewBox='0 0 20 20' fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      <button
        onClick={scrollToComment}
        className='flex items-center justify-center rounded-full bg-bgDark-200 p-2 text-bgDark-500 hover:bg-bgDark-300 dark:bg-bgDark-700 dark:text-bgDark-400 hover:dark:bg-bgDark-600'
      >
        <svg className='h-4 w-4' viewBox='0 0 20 20' fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z'
            clipRule='evenodd'
          />
        </svg>
      </button>
    </div>
  );
};

export default ScrollTopAndComment;
