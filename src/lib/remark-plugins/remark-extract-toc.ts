import type { Content } from 'mdast';
import type { Toc } from '@/types/data.type';
import { visit } from 'unist-util-visit';
import { slug } from 'github-slugger';
import { toString } from 'mdast-util-to-string';

const remarkTocExtractor =
  ({ toc }: { toc: Toc }) =>
  (tree: Content) =>
    visit(tree, 'heading', (node, index, parent) => {
      const textContent = toString(node);
      toc.push({
        value: textContent,
        url: '#' + slug(textContent),
        depth: node.depth,
      });
    });

export default remarkTocExtractor;
