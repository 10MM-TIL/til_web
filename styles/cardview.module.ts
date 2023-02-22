import styled from '@emotion/styled';
import { BACKGROUND_COLOR } from '@/constants/color';
import { mq } from './mediaQuery';
export const CardViewContainer = styled.div`
  background-color: ${BACKGROUND_COLOR.NAVY_1};
  padding: 0 24px;
  min-height: 100%;
`;
export const CardViewWrapper = styled.div`
  max-width: 328px;
  margin: 0 auto;

  ${mq('desktop')} {
    max-width: 1168px;
  }
`;

export const PopularCardViewContainer = styled.section`
  margin-bottom: 32px;
`;
export const PopularCardHeader = styled.div`
  margin-bottom: 20px;
`;
export const PopularCardContent = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  flex-basis: 100%;

  ${mq('desktop')} {
    flex-basis: calc(33.33% - 8px);
  }
`;

export const AllCardViewConttainer = styled.section``;
export const AllCardHeader = styled.div`
  margin-bottom: 20px;
`;
export const AllCardContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  flex-basis: 100%;
  gap: 8px;
  > div {
    margin-bottom: 12px;
  }

  ${mq('desktop')} {
    flex-basis: calc(33.33% - 8px);
  }
`;
