import type { FC } from 'react';
import type { TagInfo } from '@/types/data.type';
import TagButton from './TagButton';

type Props = {
  tags: string[] | TagInfo[] | null;
};

const isStringArray = (array: any[]): array is string[] => array.length > 0 && typeof array[0] === 'string';

const TagContainer: FC<Props> = ({ tags }) => {
  if (tags === null || tags.length === 0) return null;

  return (
    <div className='flex flex-wrap gap-2'>
      {isStringArray(tags)
        ? tags.map((tag, i) => <TagButton key={i} name={tag} />)
        : tags.map((tag, i) => <TagButton key={i} {...tag} />)}
    </div>
  );
};

export default TagContainer;
