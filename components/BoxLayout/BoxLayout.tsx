import { ReactElement } from 'react';
import * as Typo from '@/components/Typography';
import { BoxLayoutContainer, ChildContainer } from './style';
import { BoxLayoutProps } from './type';

export const BoxLayout = ({
  title = '분야',
  children,
  childDirection = 'row',
  childrenWrapperCss = {},
}: BoxLayoutProps): ReactElement => {
  return (
    <BoxLayoutContainer>
      <div>
        <Typo.H1 color='#FFFFFF'>{title}</Typo.H1>
      </div>
      <ChildContainer childDirection={childDirection} childrenWrapperCss={childrenWrapperCss}>
        {children}
      </ChildContainer>
    </BoxLayoutContainer>
  );
};
