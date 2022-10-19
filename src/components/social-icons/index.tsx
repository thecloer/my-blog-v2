import type { FC } from 'react';
import Mail from './mail.svg';
import Github from './github.svg';
import Linkedin from './linkedin.svg';
import Twitter from './twitter.svg';
import Instagram from './instagram.svg';

// Icons taken from: https://simpleicons.org/

const ICONS_COMPONENTS = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
};

type Props = {
  kind: keyof typeof ICONS_COMPONENTS;
  href: string;
  size?: number;
};

const SocialIcon: FC<Props> = ({ kind, href, size = 6 }) => {
  const SocialSvg = ICONS_COMPONENTS[kind];

  const specificClassName = kind === 'mail' ? '[&>*]:scale-y-110 [&>*]:scale-x-110' : '';

  return (
    <a
      className='dark:hover:text-primary-dark-400; text-sm text-slate-600 transition-colors hover:text-primary-light-600 dark:text-slate-200'
      target='_blank'
      rel='noopener noreferrer'
      href={href}
    >
      <span className='sr-only'>{kind}</span>
      <SocialSvg width={size * 4} height={size * 4} className={`fill-current ${specificClassName}`} />
    </a>
  );
};

export default SocialIcon;
