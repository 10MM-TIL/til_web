import styled from '@emotion/styled';
import { mq } from '@/styles/mediaQuery';

export const LargeCardView = 384;
export const RowGap = 12;
export const ColGap = 8;
export const ColumnTemplate = `calc((${LargeCardView}px - ${ColGap}px) / 2)`;
export const EmptyCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 130px;
  text-align: center;
  ${mq('desktop')} {
    height: 170px;
  }
`;
