import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { BoxLayoutProps } from './type';
type aa = Pick<BoxLayoutProps, 'childDirection' | 'childrenWrapperCss'>;

export const BoxLayoutContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 776px;
  min-height: 84px;
  padding: 24px 40px 24px 44px;
  background: #1e252f;
  border-radius: 12px;
`;

export const ChildContainer = styled.div<aa>`
  display: flex;
  flex-direction: ${({ childDirection }) => (childDirection === 'row' ? 'row' : 'column')};
  ${({ childrenWrapperCss }) =>
    css`
      ${{ ...childrenWrapperCss }};
    `}
`;

/* 
  ${({ childrenWrapperCss }) => childrenWrapperCss} 
  이방식은 왜 typescript 오류를 내는가 ?
*/
