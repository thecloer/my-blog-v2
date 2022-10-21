import type { FC } from 'react';
import { Github, Instagram, Linkedin, Mail, Twitter } from '@/lib/svgs';

const ICONS = { Github, Instagram, Linkedin, Mail, Twitter };

type Props = {
  kind: keyof typeof ICONS;
  href: string;
  size?: number;
};

const SocialIcon: FC<Props> = ({ kind, href, size = 6 }) => {
  const SocialSvg = ICONS[kind];

  const specificClassName = kind === 'Mail' ? '[&>*]:scale-y-110 [&>*]:scale-x-110' : '';

  return (
    <a
      className='text-sm text-slate-600 transition-colors hover:text-primary-light-600 dark:text-slate-200 dark:hover:text-primary-dark-400'
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
