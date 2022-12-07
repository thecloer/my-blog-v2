import type { ChangeEventHandler } from 'react';
import { useSearchContext } from '@/contexts/SearchContext';
import { Magnifier } from '@/lib/svgs';

// TODO: form(to='/blog/search/[searchString]')

const SearchBar = () => {
  const { searchString, setSearchString } = useSearchContext();
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => setSearchString(e.target.value);

  return (
    <div className='relative my-6 max-w-lg'>
      <input
        aria-label='Search articles'
        type='text'
        onChange={onChange}
        value={searchString}
        placeholder='Search articles'
        className='block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100'
      />
      <Magnifier className='absolute top-3 right-3 h-5 w-5 text-gray-400 dark:text-gray-300' />
    </div>
  );
};

export default SearchBar;
