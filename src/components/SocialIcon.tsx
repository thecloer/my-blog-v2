import type { FC, MouseEventHandler } from 'react';
import { GithubIcon, InstagramIcon, LinkedinIcon, MailIcon, TwitterIcon } from '@/lib/svgs';

const ICONS = {
  github: GithubIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  mail: MailIcon,
  twitter: TwitterIcon,
};

type Props = {
  kind: keyof typeof ICONS;
  href: string;
  size?: number;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const SocialIcon: FC<Props> = ({ kind, href, size = 6, onClick }) => {
  const SocialSvg = ICONS[kind];

  const specificClassName = kind === 'mail' ? '[&>*]:scale-y-110 [&>*]:scale-x-110' : '';

  return (
    <a
      className='text-sm text-slate-600 transition-colors hover:text-primary-100 dark:text-slate-200 dark:hover:text-primary-200'
      target='_blank'
      rel='noopener noreferrer'
      href={href}
      onClick={onClick}
    >
      <span className='sr-only'>{kind}</span>
      <SocialSvg width={size * 4} height={size * 4} className={`fill-current ${specificClassName}`} />
    </a>
  );
};

export default SocialIcon;
