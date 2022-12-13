import type { FC } from 'react';
import type { GetStaticProps } from 'next';
import type { BlogFrontMatterWithSlug, TagInfo } from '@/types/data.type';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import urlPath from '@/config/urlPath';
import { Blog } from '@/repositories/blog';
import ContentWithSidebarLayout from '@/layouts/ContentWithSidebarLayout';
import AppWidthContainer from '@/containers/AppWidthContainer';
import MultiTagSelect from '@/components/MultiTagSelect';
import PostList from '@/components/PostList';
import NoTag from '@/components/SimpleView/NoTag';

type Props = {
  tags: TagInfo[];
};

const TagsPage: FC<Props> = ({ tags }) => {
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState(() => {
    const searchedTagsRaw = router.query.tags;
    const searchedTags = typeof searchedTagsRaw === 'string' ? [searchedTagsRaw] : searchedTagsRaw ?? [];
    return tags.filter((t) => searchedTags.includes(t.name));
  });

  const [displayPosts, setDisplayPosts] = useState<BlogFrontMatterWithSlug[]>([]);

  useEffect(() => {
    if (selectedTags.length === 0) {
      setDisplayPosts([]);
      return;
    }

    // TODO: API call
    const searchPosts = async () => {
      const res = await fetch(urlPath.api.blog.search.tags(selectedTags.map((t) => t.name)));
      const { result } = await res.json();
      setDisplayPosts(result);
    };
    searchPosts();
  }, [selectedTags]);

  return (
    <AppWidthContainer>
      <ContentWithSidebarLayout
        sidebar={<MultiTagSelect options={tags} selectedTags={selectedTags} onChange={setSelectedTags} />}
      >
        <PostList posts={displayPosts} NoItemView={<NoTag />} />
      </ContentWithSidebarLayout>
    </AppWidthContainer>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const tags = Blog.getAllTags();

  return {
    props: {
      tags,
    },
  };
};

export default TagsPage;
