import styled from '@emotion/styled';
import { BACKGROUND_COLOR } from '@/constants/color';
import { mq } from './mediaQuery';

export const MypageWrapper = styled.div`
  background-color: ${BACKGROUND_COLOR.NAVY_1};

  min-height: 100vh;
`;
export const MypageContainer = styled.div`
  max-width: 328px;
  margin: 0 auto;
  padding-top: 134px;
  ${mq('desktop')} {
    max-width: 781px;
  }
`;

export const IntroContainer = styled.div`
  display: flex;
  gap: 39px;
  ${mq('desktop')} {
    gap: 89px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 209px;

  padding-top: 12px;
  padding-bottom: 18px;
  ${mq('desktop')} {
    width: 487px;
  }
`;

export const InfoLeftArea = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  gap: 15px;
`;

export const InfoRightArea = styled.div`
  height: 36px;
  padding-right: 5px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const IntroductionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 22px;
  width: 209px;
  // 피그마 상 잔디의 글자와의 padding 이 62px로 되어있음(잔디 내 패팅 10px존재)
  padding-bottom: 52px;

  ${mq('desktop')} {
    width: 492px;
  }
`;

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

export const FloatingContainer = styled.div`
  position: fixed;
  bottom: 12px;
  right: 12px;
  ${mq('desktop')} {
    bottom: 58px;
    right: 69px;
  }
`;
