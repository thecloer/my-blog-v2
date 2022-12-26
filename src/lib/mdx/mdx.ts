import DATA_PATH from '@/config/dataPath';
import type { BlogFrontMatter, BlogMdxMetaData, Toc } from '@/types/data.type';
import { readFileSync } from 'fs';
import { bundleMDX } from 'mdx-bundler';
import path from 'path';
import readingTime from 'reading-time';
// remark plugins
import remarkGfm from 'remark-gfm';
import remarkExtractToc from './remark-extract-toc';
// rehype plugins
import rehypeSlug from 'rehype-slug';
import rehypePrismPlusCustom from './rehype-prism-plus-custom';

export const getMdxDataByPath = async (filePath: string) => {
  const source = readFileSync(filePath, 'utf8');

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  process.env.ESBUILD_BINARY_PATH =
    process.platform === 'win32'
      ? path.join(process.cwd(), 'node_modules', 'esbuild', 'esbuild.exe')
      : path.join(process.cwd(), 'node_modules', 'esbuild', 'bin', 'esbuild');

  const toc: Toc = [];
  const { code: mdxSource, frontmatter } = await bundleMDX<BlogFrontMatter>({
    source,
    // mdx imports can be automatically source from the components cwd directory.
    cwd: DATA_PATH.MDX_COMPONENTS_ROOT,
    mdxOptions(options, frontmatter) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []), //
        // TODO: Plugin types 'unified'.Plugin vs 'unist-util-visit/complex-types.d.ts'.Visitor
        [remarkExtractToc, { toc, title: frontmatter.title }],
        [remarkGfm, { singleTilde: false }],
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []), //
        rehypeSlug,
        [rehypePrismPlusCustom, { showLineNumbers: true, ignoreMissing: true }],
      ];
      return options;
    },
  });

  const mdxMeta: BlogMdxMetaData = {
    ...frontmatter,
    toc,
    readingTime: readingTime(mdxSource),
  };

  return {
    mdxSource,
    mdxMeta,
  };
};
