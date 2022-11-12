import type { CommonFrontMatter, SortFunc } from '@/types/types';

export const sortByFrontMatterDateDESC: SortFunc<CommonFrontMatter> = (a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
};
