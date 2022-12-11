import { useEffect, useState } from 'react';
import { useSearchContext } from '@/contexts/SearchContext';
import { Magnifier } from '@/lib/svgs';
import useDebounce from '@/hooks/useDebounce';

// TODO: form(to='/blog/search/[searchString]')

const SearchBar = () => {
  const { setSearchString } = useSearchContext(); // SearchBar should be in SearchContextProvider
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue);

  useEffect(() => {
    setSearchString(debouncedInputValue);
    return () => setSearchString('');
  }, [debouncedInputValue, setSearchString]);

  return (
    <div className='relative mb-6 max-w-lg'>
      <input
        aria-label='Search articles'
        type='text'
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        placeholder='Search articles'
        className='block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-bgDark-900 dark:bg-bgDark-800 dark:text-gray-100'
      />
      <Magnifier className='absolute top-3 right-3 h-5 w-5 text-gray-400 dark:text-gray-300' />
    </div>
  );
};

export default SearchBar;
