import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';

type SearchContext = {
  searchString: string;
  setSearchString: Dispatch<SetStateAction<string>>;
};

const initialState = '';
const initialContext: SearchContext = {
  searchString: initialState,
  setSearchString: () => {},
};

const SearchContext = createContext<SearchContext>(initialContext);

export const SearchProvider = ({ children }: PropsWithChildren) => {
  const [searchString, setSearchString] = useState(initialState);
  return <SearchContext.Provider value={{ searchString, setSearchString }}>{children}</SearchContext.Provider>;
};

export const useSearchContext = () => useContext(SearchContext);

export default SearchContext;
