import Link from 'next/link';
import Image from 'next/image';
import siteMetadata from '@/config/siteMetadata';
import HeaderNav from './HeaderNav';
import ThemeSwitch from './ThemeSwitch';

const Header = () => {
  return (
    <header className='flex items-center justify-between py-10'>
      <Link href='/' passHref aria-label={siteMetadata.title}>
        <a className='flex items-center gap-x-2'>
          <Image src='/images/logos/cloer-logo-indigo-512x512.png' layout='fixed' width='40' height='40' alt='blog logo' />
          <span className='hidden text-2xl font-semibold sm:block'>{siteMetadata.title}</span>
        </a>
      </Link>

      <div className='flex items-center'>
        <HeaderNav />
        <ThemeSwitch />
      </div>
    </header>
  );
};

export default Header;
