import type { Toc, TocData, TocRaw } from '@/types/data.type';

const bindParent = (nestedToc: Toc, node: TocData, currentIndex: number, plainToc: Toc): Toc => {
  const previousIndex = currentIndex - 1;
  if (previousIndex < 0) return [node, ...nestedToc];

  const previousNode = plainToc[previousIndex];
  if (previousNode.depth < node.depth) {
    previousNode.children.unshift(node);
    return nestedToc;
  }
  return bindParent(nestedToc, node, previousIndex, plainToc);
};

export const makeNestedToc = (plainToc: TocRaw) =>
  plainToc.map((tocRawData) => ({ ...tocRawData, children: [] } as TocData)).reduceRight(bindParent, [] as Toc);
