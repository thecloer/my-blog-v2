import type { BlogFrontMatter, BlogFrontMatterWithSlug } from '@/types/types';
import { type PathLike, readdirSync, statSync, readFileSync } from 'fs';
import { basename, extname, join } from 'path';
import matter from 'gray-matter';
import { flattenArray, map, pipe } from './utils/currying';
import { generateSlug } from './utils/formater';

const readdirSyncUtf8 = (path: PathLike) => readdirSync(path, 'utf-8');
const pathJoinPrefix = (prefix: string) => (path: string) => join(prefix, path);
const walkDir = (path: string): string | string[] => (statSync(path).isFile() ? path : getAllFilePathsRecursively(path));

export const getAllFilePathsRecursively = (folderPath: string) => pipe(readdirSyncUtf8, map(pipe(pathJoinPrefix(folderPath), walkDir)), flattenArray)(folderPath);

export const getBlogFrontMatterFromPath = (filePath: string): BlogFrontMatterWithSlug => {
  const { data } = matter(readFileSync(filePath, 'utf-8'));
  const frontMatter = data as BlogFrontMatter;
  const slug = generateSlug(basename(filePath, extname(filePath)));
  return { ...frontMatter, slug };
};
