import { type FC, useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';

// FIXME: custom MDXcomponents
// import mdxCustomComponents from './mdxCustomComponents';
// return <Component components={mdxCustomComponents} />;

type Props = {
  mdxSource: string;
};

const MdxComponent: FC<Props> = ({ mdxSource }) => {
  const Component = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);
  //TODO: layout
  return (
    <div className='prose mx-auto pb-8 dark:prose-dark'>
      <Component />
    </div>
  );
};

export default MdxComponent;
