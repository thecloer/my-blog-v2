import type { FC } from 'react';
import Image, { type ImageProps } from 'next/image';

const MdxImage: FC<ImageProps> = ({ src, alt, width = '100%', height = '100%', ...props }) => {
  return (
    <p className='flex justify-center'>
      <Image src={src} alt={alt} width={width} height={height} {...props} />
    </p>
  );
};

export default MdxImage;
