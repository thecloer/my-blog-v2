import type { BlogFrontMatterWithSlug } from '@/types/data.type';
import type { SortFunc } from '@/types/utils.type';
import path from 'path';
import DATA_PATH from '@/config/dataPath';
import { getAllFilePathsRecursively, getBlogFrontMatterFromPath } from '@/lib/files';
import { sortByFrontMatterDateDESC } from '@/lib/utils/sorter';
import { blogSearchFilter } from '@/lib/utils/helper';
import { getMdxDataByPath } from '@/lib/mdx/mdx';

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
    if (filePath === undefined) return null; //TODO: Error handling -> error dummy data

    return await getMdxDataByPath(filePath);
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
