import { ReactNode, ReactElement } from 'react';
import * as Typo from '@/components/Atom/Typography';
import { BoxLayoutContainer } from './style';
import { FONT_COLOR } from '@/constants/color';

export type BoxLayoutProps = {
  title?: string;
  children?: ReactNode;
};

export const BoxLayout = ({ title = '분야', children }: BoxLayoutProps): ReactElement => {
  return (
    <BoxLayoutContainer>
      <div>
        <Typo.H1 color={FONT_COLOR.WHITE}>{title}</Typo.H1>
      </div>
      <div>{children}</div>
    </BoxLayoutContainer>
  );
};
