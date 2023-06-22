import styled from '@emotion/styled';
import { BACKGROUND_COLOR } from '@/constants/color';
import { mq } from './mediaQuery';

export const EditpageWrapper = styled.div`
  background-color: ${BACKGROUND_COLOR.NAVY_1};

  min-height: 100vh;
`;

export const EditpageContainer = styled.div`
  max-width: 328px;
  margin: 0 auto;
  padding-top: 54px;
  ${mq('desktop')} {
    max-width: 781px;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 56px;
  ${mq('desktop')} {
    flex-direction: row;
    gap: 67px;
  }
`;

export const PhotoContainer = styled.div`
  ${mq('desktop')} {
    padding-left: 26px;
    align-self: flex-start;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  ${mq('desktop')} {
    width: 483px;
  }
`;

export const CheckContainer = styled.div`
  padding-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const BlogLinkContainer = styled.div`
  max-width: 776px;
  min-height: 84px;
  padding: 16px;
  background: ${BACKGROUND_COLOR.NAVY_3};
  border-radius: 12px;

  div {
    word-break: keep-all;
  }
  ${mq('desktop')} {
    padding: 24px 40px 24px 44px;
  }
`;

export const BlogTitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 36px;
  padding: 6px 12px;
  padding-bottom: 4px;
  ${mq('desktop')} {
    padding: 0;
  }
`;

export const BlogLinkList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 5px;
  ${mq('desktop')} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const SaveButtonContainer = styled.div`
  padding-top: 14px;
  padding-bottom: 48px;
  ${mq('desktop')} {
    padding: 40px 163px;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 56px;
`;
