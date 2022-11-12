import type { FC, PropsWithChildren } from 'react';

const SidebarContainer: FC<PropsWithChildren> = ({ children }) => {
  return <aside className='sticky top-[6.5rem] mr-4 hidden max-h-[calc(100vh-6.5rem)] w-[300px] shrink-0 flex-col pr-6 lg:flex'>{children}</aside>;
};

export default SidebarContainer;
