import type { BlogFrontMatterWithSlug, SortFunc } from '@/types/types';
import path from 'path';
import dataPath from '@/config/dataPath';
import { sortByFrontMatterDateDESC } from '@/lib/utils/sorter';
import { getAllFilePathsRecursively, getBlogFrontMatterFromPath } from '@/lib/files';

export class Blog {
  private static _instance: Blog;
  private readonly prefixPath: string;
  private readonly filePaths: string[];
  private readonly frontMatters: BlogFrontMatterWithSlug[];
  private constructor() {
    this.prefixPath = dataPath.blog;
    this.filePaths = getAllFilePathsRecursively(this.prefixPath).filter((filePath) => path.extname(filePath) === '.md' || path.extname(filePath) === '.mdx');
    this.frontMatters = this.filePaths.map(getBlogFrontMatterFromPath).sort(sortByFrontMatterDateDESC);
  }
  static get instance() {
    return this._instance ?? (this._instance = new this());
  }

  getAllFrontMatters(sortFunc?: SortFunc<BlogFrontMatterWithSlug>) {
    return sortFunc === undefined ? this.frontMatters : this.frontMatters.sort(sortFunc);
  }
}
