import type { FC, ReactNode } from 'react';
import type { BlogFrontMatterWithSlug } from '@/types/data.type';
import type { PaginationButtonType } from '@/types/utils.type';
import { useState } from 'react';
import Pagination from './pagination/Pagination';
import PostList from './PostList';
import { POSTS_PER_PAGE } from '@/config/layoutConfig';

type Props = {
  posts: BlogFrontMatterWithSlug[];
  NoItemView: ReactNode;
  onClick?: (pageNum: number, type: PaginationButtonType) => void;
};
const PostListWithPagination: FC<Props> = ({ posts, NoItemView, onClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const lastPage = Math.ceil(posts.length / POSTS_PER_PAGE);
  const displayedPosts = posts.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage);

  const onClickPagination = (pageNum: number, type: PaginationButtonType) => {
    setCurrentPage(pageNum);
    onClick?.(pageNum, type);
  };

  return (
    <>
      <PostList posts={displayedPosts} NoItemView={NoItemView} />
      <Pagination currentPage={currentPage} lastPage={lastPage} onClick={onClickPagination} />
    </>
  );
};

export default PostListWithPagination;
