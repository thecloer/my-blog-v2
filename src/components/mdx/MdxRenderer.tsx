import { type FC, useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';

// FIXME: custom MDXcomponents
// import mdxCustomComponents from './mdxCustomComponents';
// return <Component components={mdxCustomComponents} />;

type Props = {
  mdxSource: string;
};

const MdxRenderer: FC<Props> = ({ mdxSource }) => {
  const MDXComponent = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);
  //TODO: layout
  return (
    <div className='prose mx-auto pb-8 dark:prose-dark'>
      <MDXComponent />
    </div>
  );
};

export default MdxRenderer;
