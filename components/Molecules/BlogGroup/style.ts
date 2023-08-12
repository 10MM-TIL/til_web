import styled from '@emotion/styled';
import { Z_INDEX_LEVEL } from '@/constants/zIndex';
import { BACKGROUND_COLOR } from '@/constants/color';

export const BlogGroupContainter = styled.div`
  display: flex;
  gap: 10px;
`;

export const TooltipContainer = styled.div`
  /* position: absolute; */
  display: block;
  white-space: nowrap;

  min-width: 300px;
  max-width: 400px;
  border-radius: 12px;
  z-index: ${Z_INDEX_LEVEL['GRASS_HOVER_CONTAINER']};
  box-shadow: rgb(0 0 0 / 20%) 1px 2px 10px;
  transition: opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s,
    transform 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;
  padding: 8px;
  background: ${BACKGROUND_COLOR.NAVY_4};
`;
