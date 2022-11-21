import type { BlogFrontMatterWithSlug } from '@/types/data.type';
import type { RangeFunction } from '@/types/utils.type';
import { PAGINATION_LENGTH } from '@/config/layoutConfig';

/**
 * Create an array of numbers includes `start` and `end`.
 * If a sequence from `start` to `end` is longer than `length`, it would be limited by `length`.
 * If a sequence from `start` to `end` is shorter than `length`, it would be limited by `end`.
 * @param {number} start - The start number of the sequence
 * @param {number} end - The end number of the sequence
 * @param {number} length - Limit length of the sequence
 * @returns  A sequence of numbers from start to end
 */
const range: RangeFunction = (start: number, end: number, length?: number) =>
  end > start && (length === undefined || length > 0)
    ? Array.from({ length: length === undefined ? end - start + 1 : Math.min(length, end - start + 1) }, (_, i) => start + i)
    : [];

export const getPaginationNumbers = (currentPage: number, lastPage: number) => {
  if (lastPage <= PAGINATION_LENGTH)
    return {
      paginationNumbers: range(1, lastPage),
      hasPriviousButton: false,
      hasNextButton: false,
    };

  const gap = Math.floor(PAGINATION_LENGTH / 2);
  let start = currentPage - gap;
  let end = currentPage + gap;

  if (currentPage < gap + 1) {
    start = 1;
    end = PAGINATION_LENGTH;
  } else if (currentPage > lastPage - gap) {
    start = lastPage - PAGINATION_LENGTH + 1;
    end = lastPage;
  }

  return {
    paginationNumbers: range(start, end),
    hasPriviousButton: start > 1,
    hasNextButton: end < lastPage,
  };
};

export const blogSearchFilter = (searchTerm: string) => (frontMatter: BlogFrontMatterWithSlug) => {
  const targetKeys: Extract<keyof BlogFrontMatterWithSlug, 'title' | 'description' | 'tags' | 'series'>[] = ['description', 'title', 'series', 'tags'];
  return targetKeys.some((key) =>
    key === 'tags' ? frontMatter.tags?.some((tag) => tag.toLowerCase().includes(searchTerm)) : frontMatter[key]?.toLowerCase().includes(searchTerm)
  );
};
