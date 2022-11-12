import headerNavLinks from '@/config/headerNavLinks';
import Link from 'next/link';

const HeaderNav = () => {
  return (
    <nav className='hidden sm:flex sm:items-center'>
      {headerNavLinks.map((link) => (
        <Link key={link.title} href={link.href} passHref>
          <a className='p-4 text-base font-semibold capitalize text-slate-600 transition-colors hover:text-primary-100 dark:text-slate-200 hover:dark:text-primary-200'>
            {link.title}
          </a>
        </Link>
      ))}
    </nav>
  );
};

export default HeaderNav;
