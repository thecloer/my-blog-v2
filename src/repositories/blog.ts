import type { BlogFrontMatterWithSlug, SortFunc } from '@/types/types';
import path from 'path';
import dataPath from '@/config/dataPath';
import { getAllFilePathsRecursively, getBlogFrontMatterFromPath } from '@/lib/files';
import { sortByFrontMatterDateDESC } from '@/lib/utils/sorter';
import { blogSearchFilter } from '@/lib/utils/helper';

export class Blog {
  private static _instance: Blog;
  private readonly _prefixPath: string;
  private readonly _filePaths: string[];
  private readonly _frontMatters: BlogFrontMatterWithSlug[];

  private constructor() {
    this._prefixPath = dataPath.blog;
    this._filePaths = getAllFilePathsRecursively(this._prefixPath).filter((filePath) => path.extname(filePath) === '.md' || path.extname(filePath) === '.mdx');
    this._frontMatters = this._filePaths.map(getBlogFrontMatterFromPath).sort(sortByFrontMatterDateDESC);
  }
  static get instance() {
    return this._instance ?? (this._instance = new this());
  }

  getAllFrontMatters(sortFunc?: SortFunc<BlogFrontMatterWithSlug>) {
    return sortFunc === undefined ? this._frontMatters : this._frontMatters.sort(sortFunc);
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
