import type { GetStaticProps, NextPage } from 'next';
import type { BlogFrontMatterWithSlug, TagInfo } from '@/types/data.type';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import urlPath from '@/config/urlPath';
import { Blog } from '@/repositories/blog';
import { decodeURISlug } from '@/lib/utils/formatter';
import ContentWithSidebarLayout from '@/layouts/ContentWithSidebarLayout';
import AppWidthContainer from '@/containers/AppWidthContainer';
import PostListWithPagination from '@/components/PostListWithPagination';
import MultiTagSelect from '@/components/tag/MultiTagSelect';
import NoTag from '@/components/SimpleView/NoTag';

type Props = {
  allTags: TagInfo[];
};

const TagsPage: NextPage<Props> = ({ allTags }) => {
  const router = useRouter();
  const searchedTags = useMemo(() => {
    const rawTags = router.query.tags;
    const searchedTagNames = typeof rawTags === 'string' ? [decodeURISlug(rawTags)] : rawTags?.map(decodeURISlug) ?? [];
    return allTags.filter((t) => searchedTagNames.includes(t.name));
  }, [allTags, router.query.tags]);
  const [selectedTags, setSelectedTags] = useState(searchedTags);
  const [displayPosts, setDisplayPosts] = useState<BlogFrontMatterWithSlug[]>([]);

  useEffect(() => {
    setSelectedTags(searchedTags);
  }, [searchedTags]);

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
        sidebar={<MultiTagSelect options={allTags} selectedTags={selectedTags} onChange={setSelectedTags} />}
      >
        <PostListWithPagination posts={displayPosts} NoItemView={<NoTag />} />
      </ContentWithSidebarLayout>
    </AppWidthContainer>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allTags = Blog.getAllTags();

  return {
    props: {
      allTags,
    },
  };
};

export default TagsPage;
