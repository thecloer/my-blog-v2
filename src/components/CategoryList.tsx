import type { FC } from 'react';
import CategoryItem from '@/components/CategoryItem';

type Props = {
  categories: string[];
  selectedCategory?: string;
};

const CategoryList: FC<Props> = ({ categories, selectedCategory }) => {
  return (
    <ul>
      {categories.map((category) => (
        <CategoryItem key={category} category={category} selected={category === selectedCategory} />
      ))}
    </ul>
  );
};

export default CategoryList;
