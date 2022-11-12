import { type RefObject, useEffect } from 'react';

export const useIntersectionObserver = <T extends HTMLElement>(ref: RefObject<T>, callback: IntersectionObserverCallback, options?: IntersectionObserverInit | undefined) => {
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(callback, options);
    if (ref.current !== null) intersectionObserver.observe(ref.current);

    return () => intersectionObserver.disconnect();
  }, [ref, callback, options]);
};
