import type { Context, Dispatch, PropsWithChildren, Provider, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';

type SearchContext<T = unknown> = {
  value: T | null;
  setValue: Dispatch<SetStateAction<T | null>>;
};

const initialContext = {
  value: null,
  setValue: () => {},
};

const SearchContext = createContext<SearchContext>(initialContext);

export const SearchProvider = <T,>({ children }: PropsWithChildren) => {
  const [value, setValue] = useState<SearchContext<T>['value']>(null);
  const Provider = SearchContext.Provider as Provider<SearchContext<T>>;
  return <Provider value={{ value, setValue }}>{children}</Provider>;
};

export const useSearchContext = <T,>() => useContext<SearchContext<T>>(SearchContext as Context<SearchContext<T>>);
