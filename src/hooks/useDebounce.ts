import { useEffect, useState } from 'react';

function useDebounce<T>(value: T): T;
function useDebounce<T>(value: T, delay: number | undefined): T;
function useDebounce<T>(value: T, delay = 400): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
