import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { switchBodyOverflow } from '@/lib/dom';
import { HamburgerIcon, XIcon } from '@/lib/svgs';
import headerNavLinks from '@/config/headerNavLinks';
import useIntersection from '@/hooks/useIntersection';
import Footer from '@/components/Footer';

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersection(mobileNavRef);

  useEffect(() => {
    if (!isIntersecting) setNavShow(false);
  }, [isIntersecting]);

  useEffect(() => {
    switchBodyOverflow(navShow ? 'hidden' : 'auto');
    return () => switchBodyOverflow('auto');
  }, [navShow]);

  const onToggleNav = () => setNavShow((currentNavShow) => !currentNavShow);

  return (
    <div className='sm:hidden' ref={mobileNavRef}>
      <button
        type='button'
        className='-mr-4 flex items-center py-3 pl-2 pr-4 text-slate-600 transition-colors hover:text-primary-500 dark:text-slate-200 hover:dark:text-primary-400'
        aria-label='Toggle Menu'
        onClick={onToggleNav}
      >
        <HamburgerIcon className='h-8 w-8' />
      </button>

      <div
        className={`fixed top-0 left-0 flex h-screen w-screen flex-col bg-slate-50 px-4 duration-300 ease-in-out dark:bg-bgDark-800
        ${navShow ? 'translate-x-[0.3px]' : '-translate-x-full'}`}
      >
        <div className='flex justify-end py-6'>
          <button
            type='button'
            onClick={onToggleNav}
            className='-mr-3 py-3 px-3 hover:text-primary-500 hover:dark:text-primary-400'
          >
            <XIcon className='h-8 w-8' />
          </button>
        </div>

        <nav className='flex grow flex-col'>
          {headerNavLinks.map((link) => (
            <Link key={link.title} href={link.href} passHref>
              <a
                className='p-4 text-2xl font-bold capitalize text-slate-600 transition-colors hover:text-primary-500 dark:text-slate-200 hover:dark:text-primary-400'
                onClick={onToggleNav}
              >
                {link.title}
              </a>
            </Link>
          ))}
        </nav>

        <Footer />
      </div>
    </div>
  );
};

export default MobileNav;
