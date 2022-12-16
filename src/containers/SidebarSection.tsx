import type { FC, PropsWithChildren } from 'react';

type Props = {
  sectionName?: string;
};
const SidebarSection: FC<PropsWithChildren<Props>> = ({ sectionName, children }) => {
  return (
    <section className='mb-6 last:mb-0 lg:last:mb-8'>
      {typeof sectionName === 'string' ? <h3 className='mb-4 text-xl font-bold'>{sectionName}</h3> : null}
      {children}
    </section>
  );
};

export default SidebarSection;
