import styled from '@emotion/styled';
import { FONT_COLOR, BACKGROUND_COLOR } from '@/constants/color';
import { mq } from '@/styles/mediaQuery';

export const BlogTooltipContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 28px;
  width: 209px;
  height: 46px;
  border-radius: 12px;
  padding: 0 16px;

  background: ${BACKGROUND_COLOR.NAVY_4};

  ${mq('desktop')} {
    width: 342px;
  }
`;

export const LabelDiv = styled.div`
  padding-left: 8px;
  color: ${FONT_COLOR.WHITE};
`;
