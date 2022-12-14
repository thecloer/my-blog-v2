import type { FC, PropsWithChildren } from 'react';

const PageTitle: FC<PropsWithChildren> = ({ children }) => {
  return <h1 className='mb-10 text-center text-5xl font-extrabold'>{children}</h1>;
};

export default PageTitle;
