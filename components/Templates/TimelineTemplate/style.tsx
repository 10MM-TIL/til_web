import styled from '@emotion/styled';
import { BACKGROUND_COLOR } from '@/constants/color';
import { mq } from '@/styles/mediaQuery';

export const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
`;

export const TimelineTitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 36px 12px 0px 12px;
`;

export const TimelineMobileMoreButton = styled.button`
  border-radius: 12px;
  background-color: ${BACKGROUND_COLOR.FIELD_10};
  padding: 19px;
  margin-top: 14px;
  min-width: calc(284px + 21px + 15px);
  ${mq('desktop')} {
    display: none;
  }
`;

export const TimeLineLayout = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: -10px;
  width: 100%;
  ${mq('desktop')} {
    width: 100%;
  }
`;

export const TimeLineCardContent = styled.div`
  position: relative;
  width: 100;
  margin-top: 5px;
  width: calc(100% - (21px + 15px));
`;

export const TimeLineCardNotLogin = styled.div`
  z-index: 100;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 16px;
  left: 0;
  background-color: rgba(27, 34, 44, 0.6);
  border-radius: 6px;
`;
