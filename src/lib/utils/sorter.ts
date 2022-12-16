import type { CommonFrontMatter } from '@/types/data.type';
import type { SortFunc } from '@/types/utils.type';

export const sortByFrontMatterDateDESC: SortFunc<CommonFrontMatter> = (a, b) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

export const hoistItem = <T>(list: T[], item: T) => {
  const newList = list.filter((i) => i !== item);
  if (list.indexOf(item) > -1) newList.unshift(item);
  return newList;
};
