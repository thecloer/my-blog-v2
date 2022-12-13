import type { FC } from 'react';
import type { BlogFrontMatterWithSlug } from '@/types/data.type';
import Link from 'next/link';
import Image from 'next/image';
import urlPath from '@/config/urlPath';
import TagContainer from './TagContainer';

type Props = {
  post: BlogFrontMatterWithSlug;
};

// dummy button

const PostItem: FC<Props> = ({ post: { slug, date, description, series, tags, thumbnail, title } }) => {
  return (
    <li>
      <article className='flex flex-col py-8 md:flex-row'>
        <div className='flex justify-center'>
          <Link href={urlPath.blog.posts(slug)} passHref>
            <div
              className='relative mb-4 h-36 w-36 shrink-0
                    cursor-pointer overflow-hidden rounded-xl
                    md:mb-0 md:mr-6 md:h-48 md:w-48'
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
          {series && (
            <Link href={urlPath.blog.series(series)} passHref>
              <div>
                <a className='cursor-pointer text-sm font-medium text-bgDark-500'>{series}</a>
              </div>
            </Link>
          )}

          <Link href={urlPath.blog.posts(slug)} passHref>
            <a className='flex'>
              <h2 className='mb-2 max-h-14 cursor-pointer overflow-hidden text-xl font-medium md:max-h-16 md:text-2xl '>
                {title}
              </h2>
            </a>
          </Link>

          <div className='mb-4 grow'>
            <p className='max-h-20 overflow-hidden break-words leading-relaxed'>{description}</p>
          </div>

          <TagContainer tags={tags} />
          <span className='text-sm'>{date}</span>
        </div>
      </article>
    </li>
  );
};

export default PostItem;
