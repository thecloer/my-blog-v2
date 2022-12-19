import type { FC, PropsWithChildren, ReactNode } from 'react';

type Props = {
  sidebar: ReactNode;
};

const ContentWithSidebarLayout: FC<PropsWithChildren<Props>> = ({ sidebar, children }) => {
  return (
    <div className='flex'>
      <aside className='sticky top-[6.5rem] mr-4 hidden max-h-[calc(100vh-6.5rem)] w-[300px] shrink-0 flex-col overflow-y-scroll pr-6 lg:flex'>
        {sidebar}
      </aside>
      <section className='grow pb-8'>{children}</section>
    </div>
  );
};

export default ContentWithSidebarLayout;
