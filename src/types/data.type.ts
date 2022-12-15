import type { ReadTimeResults } from 'reading-time';
import dataPath from '@/config/dataPath';

export type DataPath = keyof typeof dataPath;

type TocRawData = {
  text: string;
  url: string;
  depth: number;
};
export type TocRaw = TocRawData[];
export type TocData = TocRawData & { children: TocData[] };
export type Toc = TocData[];

// frontMatter
export type CommonFrontMatter = {
  title: string;
  description: string;
  date: string;
  thumbnail: string;
  tags: string[] | null;
};
export type TagInfo = {
  name: string;
  count: number;
};

export type BlogFrontMatter = CommonFrontMatter & { category: string | null };

/**
 * @property `slug` - file name in `data/blog/` without extension include nested paths.
 * full path = `${process.cwd()}/data/blog/${slug}.${extension}`
 */
export type BlogFrontMatterWithSlug = BlogFrontMatter & { slug: string };

// MdxData
export type MdxMetaData<T extends CommonFrontMatter> = T & { toc: Toc; readingTime: ReadTimeResults };
export type BlogMdxMetaData = MdxMetaData<BlogFrontMatter>;
