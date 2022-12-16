import type { FC } from 'react';
import type { Toc } from '@/types/data.type';
import { memo } from 'react';
import SidebarSection from '@/components/SidebarSection';
import NestedToc from '@/components/nestedToc/NestedToc';

type Props = {
  toc: Toc;
};

const PostSidebar: FC<Props> = ({ toc }) => {
  return (
    <SidebarSection>
      <NestedToc toc={toc} />
    </SidebarSection>
  );
};

export default memo(PostSidebar);
