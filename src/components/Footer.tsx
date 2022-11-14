import siteMetadata from '@/config/siteMetadata';
import AppWidthContainer from '@/containers/AppWidthContainer';
import Link from 'next/link';
import SocialIcon from './SocialIcon';

const Footer = () => {
  return (
    <footer>
      <AppWidthContainer>
        <div className='mt-8 mb-16 flex flex-col items-center gap-y-2'>
          <div className='flex gap-x-4'>
            <SocialIcon kind='mail' href={`mailto:${siteMetadata.email}`} />
            <SocialIcon kind='github' href={siteMetadata.github} />
            <SocialIcon kind='instagram' href={siteMetadata.instagram} />
            <SocialIcon kind='linkedin' href={siteMetadata.linkedin} />
            <SocialIcon kind='twitter' href={siteMetadata.twitter} />
          </div>

          <div className='flex flex-wrap justify-center gap-x-3 text-sm text-slate-500'>
            <Link href='/' passHref>
              <a className='transition-colors hover:text-slate-900 dark:hover:text-slate-300'>{siteMetadata.title}</a>
            </Link>
            <span>{`©${new Date().getFullYear()} ${siteMetadata.author}`}</span>
          </div>
        </div>
      </AppWidthContainer>
    </footer>
  );
};

export default Footer;
