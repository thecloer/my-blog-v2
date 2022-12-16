import type { FC } from 'react';
import type { BlogFrontMatterWithSlug } from '@/types/data.type';
import Link from 'next/link';
import Image from 'next/image';
import urlPath from '@/config/urlPath';
import TagContainer from '@/components/tag/TagContainer';

type Props = {
  post: BlogFrontMatterWithSlug;
};

const PostItem: FC<Props> = ({ post: { slug, date, description, category, tags, thumbnail, title } }) => {
  return (
    <li>
      <article className='flex flex-col gap-y-4 gap-x-6 py-8 md:flex-row'>
        <div className='flex items-center justify-center'>
          <Link href={urlPath.blog.posts(slug)} passHref>
            <div
              className='relative h-36 w-36
                    cursor-pointer overflow-hidden rounded-xl
                    md:h-48 md:w-48'
            >
              {thumbnail ? (
                <Image alt={title} src={`/${thumbnail}`} layout='fill' objectPosition='center' objectFit='cover' />
              ) : (
                <div className='flex h-full w-full items-center justify-center bg-bgDark-400 dark:bg-bgDark-500'>
                  <h3 className='text-white'>No Image</h3>
                </div>
              )}
            </div>
          </Link>
        </div>

        <div className='flex grow flex-col'>
          {category && (
            <Link href={urlPath.blog.categories.param(category)} passHref>
              <a className='cursor-pointer text-sm font-medium text-bgDark-400 dark:text-bgDark-500'>{category}</a>
            </Link>
          )}

          <Link href={urlPath.blog.posts(slug)} passHref>
            <h2 className='mb-2 cursor-pointer text-xl font-medium line-clamp-2'>{title}</h2>
          </Link>

          <div className='grow'>
            <p className='mb-4 text-bgDark-800 line-clamp-3 dark:text-bgDark-300'>{description}</p>
          </div>

          <TagContainer tags={tags} type='link' />
          <span className='mt-1 text-sm text-bgDark-500 dark:text-bgDark-400'>{date}</span>
        </div>
      </article>
    </li>
  );
};

export default PostItem;
