import type { FC, ReactNode } from 'react';
import type { BlogFrontMatterWithSlug } from '@/types/data.type';
import PostItem from '@/components/PostItem';

type Props = {
  posts: BlogFrontMatterWithSlug[];
  NoItemView?: ReactNode;
};

const PostList: FC<Props> = ({ posts, NoItemView = null }) => {
  return (
    <>
      {posts.length > 0 ? (
        <ul className='-my-8 divide-y-2 divide-slate-100 dark:divide-bgDark-800'>
          {posts.map((post, i) => (
            <PostItem key={i} post={post} />
          ))}
        </ul>
      ) : (
        NoItemView
      )}
    </>
  );
};

export default PostList;
