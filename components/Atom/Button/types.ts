import { CSSProperties, ReactNode } from 'react';
import { buttonStyles } from './Button';

export type ButtonProps = {
  size?: TypeObjectKey;
  backgroundColor?: CSSProperties['backgroundColor'];
  gap?: CSSProperties['gap'];
  svg?: ReactNode;
  children?: ReactNode;
  onClick: () => void;
};
export type TypeObjectKey = keyof typeof buttonStyles;
type TypeObject = {
  [K in TypeObjectKey]: {
    width: CSSProperties['width'];
    height: CSSProperties['height'];
    borderRadius: CSSProperties['borderRadius'];
  };
};
export type ButtonLayoutProps = {
  types: keyof TypeObject;
  color?: CSSProperties['color'];
  backgroundColor?: CSSProperties['backgroundColor'];
};
