import { type RefObject, useEffect } from 'react';

export const useIntersectionObserver = <T extends HTMLElement>(ref: RefObject<T>, callback: IntersectionObserverCallback, options?: IntersectionObserverInit | undefined) => {
  useEffect(() => {
    const mobileNavBoardObserver = new IntersectionObserver(callback, options);
    if (ref.current !== null) mobileNavBoardObserver.observe(ref.current);

    return () => mobileNavBoardObserver.disconnect();
  }, [ref, callback, options]);
};
