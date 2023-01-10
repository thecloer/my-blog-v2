import type { GetStaticProps, NextPage } from 'next';
import type { BlogFrontMatterWithSlug, TagInfo } from '@/types/data.type';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import siteMetadata from '@/config/siteMetadata';
import urlPath from '@/config/urlPath';
import Blog from '@/repositories/blog';
import { decodeURISlug } from '@/lib/utils/formatter';
import ContentWithSidebarLayout from '@/layouts/ContentWithSidebarLayout';
import InlineSidebarWrapper from '@/containers/InlineSidebarWrapper';
import AppWidthContainer from '@/containers/AppWidthContainer';
import PostListWithPagination from '@/components/PostListWithPagination';
import MultiTagSelect from '@/components/tag/MultiTagSelect';
import { PageSEO } from '@/components/SEO';
import NoTag from '@/components/simpleViews/NoTag';

type Props = {
  allPosts: BlogFrontMatterWithSlug[];
  allTags: TagInfo[];
};

const TagsPage: NextPage<Props> = ({ allPosts, allTags }) => {
  const router = useRouter();
  const searchedTags = useMemo(() => {
    const rawTags = router.query.tags;
    const searchedTagNames = typeof rawTags === 'string' ? [decodeURISlug(rawTags)] : rawTags?.map(decodeURISlug) ?? [];
    return allTags.filter((t) => searchedTagNames.includes(t.name));
  }, [allTags, router.query.tags]);
  const [selectedTags, setSelectedTags] = useState(searchedTags);
  const [displayPosts, setDisplayPosts] = useState<BlogFrontMatterWithSlug[]>(allPosts);

  useEffect(() => {
    setSelectedTags(searchedTags);
  }, [searchedTags]);

  useEffect(() => {
    if (selectedTags.length === 0) return setDisplayPosts(allPosts);

    // TODO: API call
    const searchPosts = async () => {
      const res = await fetch(urlPath.api.blog.search.tags(selectedTags.map((t) => t.name)));
      const { result } = await res.json();
      setDisplayPosts(result);
    };
    searchPosts();
  }, [selectedTags, allPosts]);

  return (
    <>
      <PageSEO title={`Tags | ${siteMetadata.title} | ${siteMetadata.author}`} description='Blog posts tags' />
      <AppWidthContainer>
        <ContentWithSidebarLayout
          sidebar={<MultiTagSelect options={allTags} selectedTags={selectedTags} onChange={setSelectedTags} />}
        >
          <InlineSidebarWrapper>
            <MultiTagSelect options={allTags} selectedTags={selectedTags} onChange={setSelectedTags} />
          </InlineSidebarWrapper>
          <PostListWithPagination posts={displayPosts} NoItemView={<NoTag />} />
        </ContentWithSidebarLayout>
      </AppWidthContainer>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allPosts = Blog.getAllFrontMatters();
  const allTags = Blog.getAllTags();

  return {
    props: {
      allPosts,
      allTags,
    },
  };
};

export default TagsPage;
