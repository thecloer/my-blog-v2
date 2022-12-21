import type { Content } from 'mdast';
import type { Toc, TocRaw } from '@/types/data.type';
import { visit } from 'unist-util-visit';
import { slug } from 'github-slugger';
import { toString } from 'mdast-util-to-string';
import { makeNestedToc } from '@/lib/converter';

const remarkExtractToc =
  ({ toc, title }: { toc: Toc; title: string }) =>
  (tree: Content) => {
    const tocRaw: TocRaw = [];
    visit(tree, 'heading', (node, index, parent) => {
      const textContent = toString(node);
      tocRaw.push({
        text: textContent,
        url: `#${slug(textContent)}}`,
        depth: node.depth,
      });
    });

    if (tocRaw.at(0)?.depth !== 1) tocRaw.unshift({ text: title, url: `#${slug(title)}`, depth: 1 });

    toc.push(...makeNestedToc(tocRaw));
  };

export default remarkExtractToc;
