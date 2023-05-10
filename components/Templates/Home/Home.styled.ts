import { BACKGROUND_COLOR, FONT_COLOR } from '@/constants/color';
import { Z_INDEX_LEVEL } from '@/constants/zIndex';
import { mq } from '@/styles/mediaQuery';
import { css } from '@emotion/react';

const topContainer = css`
  display: flex;
  justify-content: center;
  position: relative;
  padding-top: 38px;
  height: 300px;
`;

const topImageContainer = css`
  position: absolute;
  width: 100%;
  height: 300px;
  left: 0;
  top: 0;
  background-image: url('/images/background.png');

  background-position: center;
`;

const topTextContainer = css`
  z-index: ${Z_INDEX_LEVEL['HOME_TEXT']}; // TODO Z-Index 관련 정리
  padding-top: 35px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 46px;
`;

const desktopContainer = css`
  ${mq('desktop')} {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
`;

const container = css`
  padding: 84px 24px;
  display: flex;
  flex-direction: column;
  gap: 36px;

  ${mq('desktop')} {
    width: 780px;
  }
`;

const textareaContainer = css`
  position: relative;
`;

const memoTab = ({ selectedTab }: { selectedTab: 'MEMO' | 'REVIEW' }) => css`
  position: absolute;
  top: -40px;
  left: 0;

  background-color: ${selectedTab === 'MEMO' ? BACKGROUND_COLOR.NAVY_3 : BACKGROUND_COLOR.NAVY_2};
  border-radius: 12px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid rgba(255, 255, 255, 0.06);
  ${selectedTab === 'MEMO' && 'border-bottom: 0'};

  width: 90px;
  height: 41px;
  z-index: ${selectedTab === 'MEMO' ? Z_INDEX_LEVEL['TAB'] : Z_INDEX_LEVEL['TAB_HIDDEN']};
  display: flex;
  justify-content: center;
  padding: 11px 30px;
`;

const reviewTab = ({ selectedTab }: { selectedTab: 'MEMO' | 'REVIEW' }) => css`
  position: absolute;
  top: -40px;
  left: ${selectedTab === 'MEMO' ? '72px' : '78px'};
  background-color: ${selectedTab === 'MEMO' ? BACKGROUND_COLOR.NAVY_2 : BACKGROUND_COLOR.NAVY_3};

  border-radius: 12px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;

  border: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 0;

  width: ${selectedTab === 'MEMO' ? '100px' : '90px'};
  height: ${selectedTab === 'MEMO' ? '40px' : '41px'};
  z-index: ${selectedTab === 'MEMO' ? Z_INDEX_LEVEL['TAB_HIDDEN'] : Z_INDEX_LEVEL['TAB']};
  display: flex;
  justify-content: center;
  padding: ${selectedTab === 'MEMO' ? '11px 30px 0 40px' : '11px 30px'};
`;

const reviewGuide = css`
  position: absolute;
  top: -36px;
  right: 0;
`;

const textarea = ({ selectedTab }: { selectedTab: 'MEMO' | 'REVIEW' }) => css`
  width: 100%;
  min-height: 216px;
  resize: none;

  background-color: ${BACKGROUND_COLOR.NAVY_3};
  color: ${FONT_COLOR.WHITE};
  border-radius: 12px;
  border-top-left-radius: 0;
  border: 1px solid rgba(255, 255, 255, 0.06);

  padding: ${selectedTab === 'MEMO' ? '28px 24px 40px' : '28px 28px 20px'};

  white-space: pre-wrap;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  :read-only {
    cursor: not-allowed;
  }

  &:focus {
    border: 1px solid rgba(255, 255, 255, 0.06);
  }
`;

const textareaBottomContainer = ({ selectedTab }: { selectedTab: 'MEMO' | 'REVIEW' }) => css`
  position: absolute;
  bottom: 20px;
  right: 26px;
  /* bottom: ${selectedTab === 'MEMO' ? '16px' : '20px'}; */
  /* right: ${selectedTab === 'MEMO' ? '136px' : '26px'}; */
`;

const elementContainer = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const elementTitle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const titleRight = css`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const iconContainer = css`
  border: 1px solid ${FONT_COLOR.GRAY_2};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const tempBox = css``;

const desktopOtherCard = css`
  width: 284px;
  padding-top: 44px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const footer = css`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const divider = css`
  width: 1px;
  height: 13px;
  background-color: ${BACKGROUND_COLOR.FIELD_10};
`;

const styles = {
  topContainer,
  topImageContainer,
  topTextContainer,
  desktopContainer,
  container,
  textareaContainer,
  memoTab,
  reviewTab,
  reviewGuide,
  textarea,
  textareaBottomContainer,
  elementContainer,
  elementTitle,
  titleRight,
  iconContainer,
  tempBox,
  desktopOtherCard,
  footer,
  divider,
};

export default styles;
