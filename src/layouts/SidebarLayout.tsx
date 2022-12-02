import type { FC, PropsWithChildren, ReactNode } from 'react';

type Props = {
  sidebar: ReactNode;
};

const SidebarLayout: FC<PropsWithChildren<Props>> = ({ sidebar, children }) => {
  return (
    <div className='flex'>
      {sidebar}
      <section className='mt-6 mb-8 grow'>{children}</section>
    </div>
  );
};

export default SidebarLayout;
