import type { FC } from 'react';
import type { TagInfo } from '@/types/data.type';
import { memo } from 'react';
import SidebarSection from '@/components/SidebarSection';
import TagContainer from '@/components/tag/TagContainer';
import CategoryList from '@/components/CategoryList';
import SearchBar from '@/components/SearchBar';

// TODO: blog tags, blog series
type Props = {
  allTags: TagInfo[];
  categories: string[];
  onSearchChange: (value: string) => void;
  onTagClick?: (name: string, count?: number) => void;
};

const BlogSidebar: FC<Props> = ({ allTags, categories, onSearchChange, onTagClick }) => {
  return (
    <>
      <SidebarSection>
        <SearchBar onChange={onSearchChange} />
      </SidebarSection>

      <SidebarSection sectionName='Category'>
        <CategoryList categories={categories} />
      </SidebarSection>

      <SidebarSection sectionName='Tags'>
        <TagContainer tags={allTags} type='button' onButtonClick={onTagClick} />
      </SidebarSection>
    </>
  );
};

export default memo(BlogSidebar);
