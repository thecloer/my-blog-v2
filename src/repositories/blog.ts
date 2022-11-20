import type { BlogFrontMatter, BlogFrontMatterWithSlug, SortFunc } from '@/types/types';
import path from 'path';
import DATA_PATH from '@/config/dataPath';
import { getAllFilePathsRecursively, getBlogFrontMatterFromPath } from '@/lib/files';
import { sortByFrontMatterDateDESC } from '@/lib/utils/sorter';
import { blogSearchFilter } from '@/lib/utils/helper';
import { readFileSync } from 'fs';
import { bundleMDX } from 'mdx-bundler';
import readingTime from 'reading-time';

export class Blog {
  private static _instance: Blog;
  private readonly _prefixPath: string;
  private readonly _filePaths: string[];
  private readonly _frontMatters: BlogFrontMatterWithSlug[];

  private constructor() {
    this._prefixPath = DATA_PATH.BLOG;
    this._filePaths = getAllFilePathsRecursively(this._prefixPath).filter((filePath) => path.extname(filePath) === '.md' || path.extname(filePath) === '.mdx');
    this._frontMatters = this._filePaths.map(getBlogFrontMatterFromPath).sort(sortByFrontMatterDateDESC);

    // TODO: RSS
  }
  static get instance() {
    return this._instance ?? (this._instance = new this());
  }

  getAllFrontMatters(sortFunc?: SortFunc<BlogFrontMatterWithSlug>) {
    return sortFunc === undefined ? this._frontMatters : this._frontMatters.sort(sortFunc);
  }

  async getMdxDataBySlug(slug: string) {
    const filePath = this._filePaths.find((path) => ['.md', '.mdx'].some((ext) => path.includes(slug + ext)));
    if (filePath === undefined) {
      console.error(`There is no file: ${filePath}`);
      return null;
    }

    const source = readFileSync(filePath, 'utf8');

    // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
    process.env.ESBUILD_BINARY_PATH =
      process.platform === 'win32' ? path.join(process.cwd(), 'node_modules', 'esbuild', 'esbuild.exe') : path.join(process.cwd(), 'node_modules', 'esbuild', 'bin', 'esbuild');

    const { code: mdxSource, frontmatter } = await bundleMDX<BlogFrontMatter>({
      source,
      // mdx imports can be automatically source from the components directory
      cwd: DATA_PATH.COMPONENTS,
      mdxOptions(options, frontmatter) {
        options.remarkPlugins = [...(options.remarkPlugins ?? [])];
        options.rehypePlugins = [...(options.rehypePlugins ?? [])];
        return options;
      },
    });

    return {
      mdxSource,
      mdxMeta: {
        ...frontmatter,
        readingTime: readingTime(mdxSource),
      },
    };
  }

  search(term: string): BlogFrontMatterWithSlug[];
  search(terms: string[]): BlogFrontMatterWithSlug[];
  search(term: string | string[]): BlogFrontMatterWithSlug[];
  search(searchString: string | string[]) {
    return typeof searchString === 'string'
      ? this._frontMatters.filter(blogSearchFilter(searchString.toLowerCase()))
      : this._frontMatters.filter((frontMatter) => searchString.every((term) => blogSearchFilter(term.toLowerCase())(frontMatter)));
  }
}
