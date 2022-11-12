import type { BlogFrontMatterWithSlug } from '@/types/types';
import { type FC } from 'react';
import PostItem from './PostItem';

type Props = {
  posts: BlogFrontMatterWithSlug[];
};

const PostList: FC<Props> = ({ posts }) => {
  return (
    <section>
      <ul className='-my-8 divide-y-2 divide-slate-100 dark:divide-slate-800'>
        {posts.map((post, i) => (
          <PostItem key={i} post={post} />
        ))}
      </ul>
    </section>
  );
};

export default PostList;
