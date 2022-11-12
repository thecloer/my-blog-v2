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
export type BlogFrontMatterWithSlug = BlogFrontMatter & { slug: string };

// common
export type SortFunc<T> = (a: T, b: T) => number;
