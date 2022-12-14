import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Magnifier } from '@/lib/svgs';
import useDebounce from '@/hooks/useDebounce';

type Props = {
  delay?: number;
  onChange: (value: string) => void;
};

const SearchBar: FC<Props> = ({ delay, onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue, delay);

  useEffect(() => {
    onChange(debouncedInputValue);
  }, [debouncedInputValue, onChange]);

  return (
    <div className='relative p-1'>
      <input
        aria-label='Search articles'
        type='text'
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        placeholder='Search articles'
        className='block w-full rounded-md border border-bgDark-300 bg-white py-2 pl-4 pr-8 text-bgDark-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-bgDark-900 dark:bg-bgDark-800 dark:text-bgDark-100'
      />
      <Magnifier className='absolute top-4 right-4 h-5 w-5 text-bgDark-400 dark:text-bgDark-300' />
    </div>
  );
};

export default SearchBar;
