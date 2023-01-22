import type { FC, PropsWithChildren } from 'react';
import type { PassingProps } from './common.type';

const SandBox: FC<PropsWithChildren<PassingProps>> = ({ children, className = '', style }) => (
  <div className={`my-6 ${className}`} style={style}>
    {children}
  </div>
);

export default SandBox;
