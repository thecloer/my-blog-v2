import headerNavLinks from '@/config/headerNavLinks';
import Link from 'next/link';

const HeaderNav = () => {
  return (
    <nav className='hidden sm:flex sm:items-center'>
      {headerNavLinks.map((link) => (
        <Link key={link.title} href={link.href} passHref>
          <a className='p-4 text-base font-medium capitalize text-slate-600 transition-colors hover:text-primary-light-600 dark:text-slate-200 hover:dark:text-primary-dark-400'>
            {link.title}
          </a>
        </Link>
      ))}
    </nav>
  );
};

export default HeaderNav;
