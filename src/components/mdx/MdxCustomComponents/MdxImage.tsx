import type { FC } from 'react';
import Image, { type ImageProps } from 'next/image';

const MdxImage: FC<ImageProps> = ({ title, src, alt = title, width = '100%', height = '100%', ...props }) => {
  return (
    <p className='flex flex-col items-center'>
      <Image src={src} alt={alt} width={width} height={height} {...props} />
      <span className='mt-2 text-sm text-bgDark-500 dark:text-bgDark-400'>{title}</span>
    </p>
  );
};

export default MdxImage;
