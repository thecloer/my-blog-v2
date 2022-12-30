import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import siteMetadata from '@/config/siteMetadata';

type Props = {
  className?: string;
};

const UtterancesComment: FC<Props> = ({ className }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const commentTheme = theme === 'dark' ? siteMetadata.comment.theme.dark : siteMetadata.comment.theme.light;
  useEffect(() => {
    if (wrapperRef.current === null || wrapperRef.current.children.length > 0) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://utteranc.es/client.js';
    script.crossOrigin = 'anonymous';
    script.setAttribute('repo', siteMetadata.comment.repo);
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', commentTheme);
    wrapperRef.current.appendChild(script);
  }, [wrapperRef, commentTheme]);

  useEffect(() => {
    const utterances = wrapperRef.current?.querySelector('iframe');
    utterances?.contentWindow?.postMessage({ type: 'set-theme', theme: commentTheme }, 'https://utteranc.es/client.js');
  }, [commentTheme]);

  return <div id={siteMetadata.comment.id} ref={wrapperRef} className={className}></div>;
};

export default UtterancesComment;
