import type { FC } from 'react';
import type { BlogFrontMatterWithSlug } from '@/types/data.type';
import PostItem from './PostItem';

// TODO: <No Posts>

type Props = {
  posts: BlogFrontMatterWithSlug[];
};

const PostList: FC<Props> = ({ posts }) => {
  return (
    <section>
      {posts.length > 0 ? (
        <ul className='-my-8 divide-y-2 divide-slate-100 dark:divide-slate-800'>
          {posts.map((post, i) => (
            <PostItem key={i} post={post} />
          ))}
        </ul>
      ) : (
        <h1>No Posts</h1>
      )}
    </section>
  );
};

export default PostList;
