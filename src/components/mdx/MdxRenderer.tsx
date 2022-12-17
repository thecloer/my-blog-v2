import type { FC } from 'react';
import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import MdxCustomComponents from './MdxCustomComponents';

type Props = {
  mdxSource: string;
};

/**
 * @returns  MDX element wrapped by MdxCustomComponents.wrapper()
 */
const MdxRenderer: FC<Props> = ({ mdxSource }) => {
  const MDXComponent = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);
  return <MDXComponent components={MdxCustomComponents} />;
};

export default MdxRenderer;
