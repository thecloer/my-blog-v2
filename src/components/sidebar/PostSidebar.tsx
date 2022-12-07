import type { FC } from 'react';
import type { Toc } from '@/types/data.type';
import SidebarContainer from '@/containers/SidebarContainer';
import NestedToc from '../nestedToc/NestedToc';

type Props = {
  toc: Toc;
};
const PostSidebar: FC<Props> = ({ toc }) => {
  return (
    <SidebarContainer>
      <NestedToc toc={toc} />
    </SidebarContainer>
  );
};

export default PostSidebar;
