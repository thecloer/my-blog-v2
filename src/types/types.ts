import dataPath from '@/config/dataPath';

export type DataPath = keyof typeof dataPath;

// frontMatter
export type CommonFrontMatter = {
  title: string;
  description: string;
  date: string;
  thumbnail: string;
  tags: string[] | null;
};

export type BlogFrontMatter = CommonFrontMatter & { series: string | null };

/**
 * @property `slug` - file name in `data/blog/` without extention include nested paths.
 * full path = `${process.cwd()}/data/blog/${slug}.${extention}`
 */
export type BlogFrontMatterWithSlug = BlogFrontMatter & { slug: string };

// common
export type SortFunc<T> = (a: T, b: T) => number;

//
export interface RangeFunction {
  (start: number, end: number): number[];
  (start: number, end: number, length: number): number[];
}
