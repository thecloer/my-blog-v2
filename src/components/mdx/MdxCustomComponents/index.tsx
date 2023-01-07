import type { MDXComponents } from 'mdx/types';
import MdxImage from './MdxImage';

const mdxCustomComponents: MDXComponents = {
  Image: MdxImage,
  // TODO: pre,

  // mdxSource container
  wrapper: ({ children }) => <div className='prose-w prose-pre:scrollbar-thin prose dark:prose-dark'>{children}</div>,
};

export default mdxCustomComponents;
