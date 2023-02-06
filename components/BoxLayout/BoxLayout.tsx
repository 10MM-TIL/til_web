import { ReactNode, ReactElement } from 'react';
import * as Typo from '@/components/Typography';
import { BoxLayoutContainer } from './style';

export type BoxLayoutProps = {
  title?: string;
  children?: ReactNode;
};

export const BoxLayout = ({ title = '분야', children }: BoxLayoutProps): ReactElement => {
  return (
    <BoxLayoutContainer>
      <div>
        <Typo.H1 color='#FFFFFF'>{title}</Typo.H1>
      </div>
      <div>{children}</div>
    </BoxLayoutContainer>
  );
};
