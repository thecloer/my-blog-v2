import { useRef, useState } from 'react';
import Link from 'next/link';
import { switchBodyOverflow } from '@/lib/dom';
import { HamburgerIcon, XIcon } from '@/lib/svgs';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import headerNavLinks from '@/config/headerNavLinks';
import siteMetadata from '@/config/siteMetadata';
import SocialIcon from '@/components/SocialIcon';

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false);
  const mobileNavBoardRef = useRef<HTMLDivElement>(null);

  const onToggleNav = () => setNavShow((currentNavShow) => !currentNavShow);

  useIntersectionObserver(mobileNavBoardRef, ([mobileNavBoardEntry]) =>
    navShow ? (mobileNavBoardEntry.isIntersecting ? switchBodyOverflow('hidden') : setNavShow(false)) : switchBodyOverflow('auto')
  );

  return (
    <div className='sm:hidden'>
      <button
        type='button'
        className='-mr-4 flex items-center py-3 pl-2 pr-4 text-slate-600 transition-colors hover:text-primary-100 dark:text-slate-200 hover:dark:text-primary-200'
        aria-label='Toggle Menu'
        onClick={onToggleNav}
      >
        <HamburgerIcon className='h-8 w-8' />
      </button>

      <div
        ref={mobileNavBoardRef}
        className={`fixed top-0 -left-4 z-50 flex h-screen w-screen transform flex-col bg-slate-50 px-4 duration-300 ease-in-out dark:bg-slate-800
        ${navShow ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className='flex justify-end py-6'>
          <button type='button' onClick={onToggleNav} className='-mr-3 py-3 px-3 hover:text-primary-100 hover:dark:text-primary-200'>
            <XIcon className='h-8 w-8' />
          </button>
        </div>

        <nav className='flex grow flex-col'>
          {headerNavLinks.map((link) => (
            <Link key={link.title} href={link.href} passHref>
              <a
                className='p-4 text-2xl font-bold capitalize text-slate-600 transition-colors hover:text-primary-100 dark:text-slate-200 hover:dark:text-primary-200'
                onClick={onToggleNav}
              >
                {link.title}
              </a>
            </Link>
          ))}
        </nav>

        <div className='mt-8 mb-10 flex flex-col items-center gap-y-2'>
          <div className='flex gap-x-4'>
            <SocialIcon kind='mail' href={`mailto:${siteMetadata.email}`} onClick={onToggleNav} />
            <SocialIcon kind='github' href={siteMetadata.github} onClick={onToggleNav} />
            <SocialIcon kind='instagram' href={siteMetadata.instagram} onClick={onToggleNav} />
            <SocialIcon kind='linkedin' href={siteMetadata.linkedin} onClick={onToggleNav} />
            <SocialIcon kind='twitter' href={siteMetadata.twitter} onClick={onToggleNav} />
          </div>

          <div className='flex flex-wrap justify-center gap-x-3 text-sm text-slate-500'>
            <Link href='/' passHref>
              <a className='transition-colors hover:text-slate-900 dark:hover:text-slate-300' onClick={onToggleNav}>
                {siteMetadata.title}
              </a>
            </Link>
            <span>{`©${new Date().getFullYear()} ${siteMetadata.author}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
