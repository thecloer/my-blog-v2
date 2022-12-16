import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

const useIntersection = (ref: RefObject<Element>) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref?.current) return;
    const observer = new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return isIntersecting;
};

export default useIntersection;
