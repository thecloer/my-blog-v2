import type { CommonFrontMatter } from '@/types/data.type';
import type { SortFunc } from '@/types/utils.type';

export const sortByFrontMatterDateDESC: SortFunc<CommonFrontMatter> = (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime();
