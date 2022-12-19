import { useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import headerNavLinks from '@/config/headerNavLinks';
import urlPath from '@/config/urlPath';

const HeaderNav = () => {
  const { asPath } = useRouter();
  const isCurrentLink = useCallback(
    (href: string) =>
      href === urlPath.blog.index
        ? asPath === urlPath.root ||
          asPath === urlPath.blog.index ||
          asPath.startsWith(urlPath.blog.page(0).slice(0, -1))
        : asPath.startsWith(href),
    [asPath]
  );

  return (
    <nav className='hidden sm:flex sm:items-center'>
      {headerNavLinks.map(({ href, title }) =>
        isCurrentLink(href) ? (
          <a className='cursor-default p-4 text-base font-semibold capitalize text-primary-500 dark:text-primary-400'>
            {title}
          </a>
        ) : (
          <Link key={title} href={href}>
            <a className='p-4 text-base font-semibold capitalize text-bgDark-600 transition-colors hover:text-primary-500 dark:text-bgDark-200 hover:dark:text-primary-400'>
              {title}
            </a>
          </Link>
        )
      )}
    </nav>
  );
};

export default HeaderNav;
