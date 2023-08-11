import { BACKGROUND_COLOR, FONT_COLOR, POINT_COLOR } from '@/constants/color';
import { mq } from '@/styles/mediaQuery';
import { css } from '@emotion/react';

export const footer = css`
  display: flex;
  align-items: center;
  gap: 16px;

  ${mq('desktop')} {
    justify-content: center;
  }
`;
export const divider = css`
  width: 1px;
  height: 13px;
  background-color: ${BACKGROUND_COLOR.FIELD_10};
`;
