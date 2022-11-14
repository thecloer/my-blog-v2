import type { FC, PropsWithChildren } from 'react';

const AppWidthContainer: FC<PropsWithChildren> = ({ children }) => {
  return <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-4xl xl:max-w-5xl xl:px-0'>{children}</div>;
};

export default AppWidthContainer;
