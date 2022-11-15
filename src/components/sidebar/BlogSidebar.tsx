import SidebarContainer from '@/containers/SidebarContainer';
import SearchBar from '@/components/SearchBar';

const BlogSidebar = () => {
  return (
    <SidebarContainer>
      <SearchBar />
      <nav>navigation</nav>
    </SidebarContainer>
  );
};

export default BlogSidebar;
