import type { BlogFrontMatterWithSlug } from '@/types/data.type';
import type { SortFunc } from '@/types/utils.type';
import path from 'path';
import DATA_PATH from '@/config/dataPath';
import { getAllFilePathsRecursively, getBlogFrontMatterFromPath } from '@/lib/files';
import { sortByFrontMatterDateDESC } from '@/lib/utils/sorter';
import { blogSearchFilter, isMdxFile } from '@/lib/utils/helper';
import { getMdxDataByPath } from '@/lib/mdx/mdx';

export class Blog {
  private static _staticInstance: Blog;
  private readonly _prefixPath = DATA_PATH.BLOG;
  private readonly _filePaths: string[];
  private readonly _frontMatters: BlogFrontMatterWithSlug[];
  private readonly _tagMap: Map<string, BlogFrontMatterWithSlug[]> = new Map();
  private readonly _seriesMap: Map<string, BlogFrontMatterWithSlug[]> = new Map();

  private constructor() {
    this._filePaths = getAllFilePathsRecursively(this._prefixPath).filter(isMdxFile);
    this._frontMatters = this._filePaths.map(getBlogFrontMatterFromPath).sort(sortByFrontMatterDateDESC);
    this._frontMatters.forEach((frontMatter) => {
      // TagMap
      frontMatter.tags?.forEach((tag) =>
        this._tagMap.has(tag) ? this._tagMap.get(tag)!.push(frontMatter) : this._tagMap.set(tag, [frontMatter])
      );
      // SeriesMap
      const series = frontMatter.series;
      if (series !== null)
        this._seriesMap.has(series)
          ? this._seriesMap.get(series)!.push(frontMatter)
          : this._seriesMap.set(series, [frontMatter]);
    });

    // TODO: RSS
  }
  private static get instance() {
    return this._staticInstance ?? (this._staticInstance = new this());
  }

  static getAllFrontMatters(sortFunc?: SortFunc<BlogFrontMatterWithSlug>) {
    return sortFunc === undefined ? Blog.instance._frontMatters : Blog.instance._frontMatters.sort(sortFunc);
  }
  static getFrontMattersByTag(tag: string, sortFunc?: SortFunc<BlogFrontMatterWithSlug>) {
    return sortFunc === undefined ? Blog.instance._tagMap.get(tag) : Blog.instance._tagMap.get(tag)?.sort(sortFunc);
  }
  static getFrontMattersBySeries(series: string, sortFunc?: SortFunc<BlogFrontMatterWithSlug>) {
    return sortFunc === undefined
      ? Blog.instance._seriesMap.get(series)
      : Blog.instance._seriesMap.get(series)?.sort(sortFunc);
  }
  static getTags() {
    return Array.from(Blog.instance._tagMap.keys());
  }
  static getSeries() {
    return Array.from(Blog.instance._seriesMap.keys());
  }

  static async getMdxDataBySlug(slug: string) {
    const filePath = Blog.instance._filePaths.find((path) => ['.md', '.mdx'].some((ext) => path.includes(slug + ext)));
    if (filePath === undefined) return null; //TODO: getMdxDataBySlug: No File Error

    return await getMdxDataByPath(filePath);
  }

  static search(term: string): BlogFrontMatterWithSlug[];
  static search(terms: string[]): BlogFrontMatterWithSlug[];
  static search(term: string | string[]): BlogFrontMatterWithSlug[];
  static search(searchString: string | string[]) {
    return typeof searchString === 'string'
      ? Blog.instance._frontMatters.filter(blogSearchFilter(searchString.toLowerCase()))
      : Blog.instance._frontMatters.filter((frontMatter) =>
          searchString.every((term) => blogSearchFilter(term.toLowerCase())(frontMatter))
        );
  }
}
