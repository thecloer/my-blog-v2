import type { FC } from 'react';
import SidebarSection from '@/components/SidebarSection';
import CategoryList from '@/components/CategoryList';

type Props = {
  categories: string[];
  selectedCategory?: string;
};

const CategoriesSidebar: FC<Props> = ({ categories, selectedCategory }) => {
  return (
    <SidebarSection sectionName='Category'>
      <CategoryList categories={categories} selectedCategory={selectedCategory} />
    </SidebarSection>
  );
};

export default CategoriesSidebar;
