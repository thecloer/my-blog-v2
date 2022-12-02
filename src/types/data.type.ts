import type { ReadTimeResults } from 'reading-time';
import dataPath from '@/config/dataPath';

export type DataPath = keyof typeof dataPath;

export type Toc = {
  value: string;
  url: string;
  depth: number;
}[];

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

// MdxData
export type MdxMetaData<T extends CommonFrontMatter> = T & { toc: Toc; readingTime: ReadTimeResults };
export type BlogMdxMetaData = MdxMetaData<BlogFrontMatter>;
