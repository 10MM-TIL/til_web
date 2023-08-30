import { mq } from '@/styles/mediaQuery';
import { css } from '@emotion/react';

export const elementContainer = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  ${mq('desktop')} {
    width: 284px;
    padding-top: 44px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

export const elementTitle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
