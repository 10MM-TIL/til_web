import { ReactNode, CSSProperties } from 'react';

export type BoxLayoutProps = {
  title?: string;
  childDirection?: 'row' | 'col';
  children?: ReactNode;
  childrenWrapperCss?: CSSProperties;
};
