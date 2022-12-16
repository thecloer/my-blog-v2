import type { FC } from 'react';
import type { TagInfo } from '@/types/data.type';
import TagLink from '@/components/tag/TagLink';
import TagButton from '@/components/tag/TagButton';

type Props = {
  tags: string[] | TagInfo[] | null;
  type: 'link' | 'button';
  onButtonClick?: (name: string, count?: number) => void;
};

const isStringArray = (array: unknown[]): array is string[] => array.length > 0 && typeof array[0] === 'string';

const TagContainer: FC<Props> = ({ tags, type, onButtonClick }) => {
  if (tags === null || tags.length === 0) return null;
  const tagList =
    type === 'link'
      ? isStringArray(tags)
        ? tags.map((tag, i) => <TagLink key={i} name={tag} />)
        : tags.map((tag, i) => <TagLink key={i} {...tag} />)
      : isStringArray(tags)
      ? tags.map((tag, i) => <TagButton key={i} name={tag} onClick={onButtonClick} />)
      : tags.map((tag, i) => <TagButton key={i} {...tag} onClick={onButtonClick} />);

  return <div className='flex flex-wrap gap-2'>{tagList}</div>;
};

export default TagContainer;
