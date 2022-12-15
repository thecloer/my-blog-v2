import type { BlogFrontMatterWithSlug, TagInfo } from '@/types/data.type';
import type { SortFunc } from '@/types/utils.type';
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
  private readonly _categoryMap: Map<string, BlogFrontMatterWithSlug[]> = new Map();

  private constructor() {
    this._filePaths = getAllFilePathsRecursively(this._prefixPath).filter(isMdxFile);
    this._frontMatters = this._filePaths.map(getBlogFrontMatterFromPath).sort(sortByFrontMatterDateDESC);
    this._frontMatters.forEach((frontMatter) => {
      // TagMap
      frontMatter.tags?.forEach((tag) =>
        this._tagMap.has(tag) ? this._tagMap.get(tag)!.push(frontMatter) : this._tagMap.set(tag, [frontMatter])
      );
      // CategoryMap
      const category = frontMatter.category; // if no category in mdx file, category is undefined but typescript doesn't know that
      // TODO: null => uncategorized
      if (category !== null && category !== undefined)
        this._categoryMap.has(category)
          ? this._categoryMap.get(category)!.push(frontMatter)
          : this._categoryMap.set(category, [frontMatter]);
    });

    // TODO: RSS
  }
  private static get instance() {
    return this._staticInstance ?? (this._staticInstance = new this());
  }

  static getAllFrontMatters(sortFunc?: SortFunc<BlogFrontMatterWithSlug>) {
    return sortFunc === undefined ? Blog.instance._frontMatters : Blog.instance._frontMatters.sort(sortFunc);
  }
  static getFrontMattersByTag(tag: string | string[], sortFunc?: SortFunc<BlogFrontMatterWithSlug>) {
    if (typeof tag === 'string')
      return (
        (sortFunc === undefined ? Blog.instance._tagMap.get(tag) : Blog.instance._tagMap.get(tag)?.sort(sortFunc)) ?? []
      );

    const frontMatters = [...new Set(tag.map((t) => Blog.instance._tagMap.get(t) ?? []).flat())];
    return sortFunc === undefined ? frontMatters : frontMatters?.sort(sortFunc);
  }
  static getFrontMattersByCategory(category: string, sortFunc?: SortFunc<BlogFrontMatterWithSlug>) {
    return (
      (sortFunc === undefined
        ? Blog.instance._categoryMap.get(category)
        : Blog.instance._categoryMap.get(category)?.sort(sortFunc)) ?? []
    );
  }
  static getAllTags() {
    const tags: TagInfo[] = [];
    for (const [tagName, frontMatters] of Blog.instance._tagMap) {
      tags.push({ name: tagName, count: frontMatters.length });
    }
    return tags;
  }
  static getAllCategories() {
    return Array.from(Blog.instance._categoryMap.keys());
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
