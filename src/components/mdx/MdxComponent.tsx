import { type FC, useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';

// FIXME: custom MDXcomponents
// import mdxCostumComponents from './mdxCostumComponents';
// return <Component components={mdxCostumComponents} />;

type Props = {
  mdxSource: string;
};

const MdxComponent: FC<Props> = ({ mdxSource }) => {
  const Component = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <Component />;
};

export default MdxComponent;
