import type { FC } from 'react';
import type { Toc } from '@/types/data.type';
import TocHeading from './TocHeading';

type Props = {
  toc: Toc;
};
const NestedToc: FC<Props> = ({ toc }) => {
  return (
    <div>
      {toc.map((heading) => (
        <TocHeading key={heading.url} heading={heading} />
      ))}
    </div>
  );
};

export default NestedToc;
