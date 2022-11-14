import Link from 'next/link';
import Image from 'next/image';
import siteMetadata from '@/config/siteMetadata';
import HeaderNav from './HeaderNav';
import ThemeSwitch from './ThemeSwitch';
import MobileNav from './MobileNav';
import AppWidthContainer from '@/containers/AppWidthContainer';

const Header = () => {
  return (
    <header className='sticky top-0 z-10 bg-white/80 py-6 backdrop-blur dark:bg-slate-900/80'>
      <AppWidthContainer>
        <div className='flex items-center justify-between'>
          <Link href='/' aria-label={siteMetadata.title} passHref>
            <a className='flex items-center gap-x-2'>
              <Image src='/images/logos/cloer-logo-indigo-512x512.png' layout='fixed' width='40' height='40' alt='blog logo' />
              <span className='hidden text-2xl font-semibold sm:block'>{siteMetadata.title}</span>
            </a>
          </Link>

          <div className='flex items-center'>
            <HeaderNav />
            <ThemeSwitch />
            <MobileNav />
          </div>
        </div>
      </AppWidthContainer>
    </header>
  );
};

export default Header;
