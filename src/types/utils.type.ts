export interface RangeFunction {
  (start: number, end: number): number[];
  (start: number, end: number, length: number): number[];
}

export type SortFunc<T> = (a: T, b: T) => number;

export type PaginationButtonType = 'current' | 'normal' | 'Previous' | 'Next';
