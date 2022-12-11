import type { FC } from 'react';
import type { Toc } from '@/types/data.type';
import NestedToc from '../nestedToc/NestedToc';

type Props = {
  toc: Toc;
};

// TODO: blog tags, blog categories
const PostSidebar: FC<Props> = ({ toc }) => {
  return <NestedToc toc={toc} />;
};

export default PostSidebar;
