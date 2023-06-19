import { BACKGROUND_COLOR, FONT_COLOR, POINT_COLOR } from '@/constants/color';
import { Z_INDEX_LEVEL } from '@/constants/zIndex';
import { mq } from '@/styles/mediaQuery';
import { css } from '@emotion/react';

const wrapper = css`
  padding-bottom: 32px;
`;

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
  cursor: pointer;
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
  cursor: pointer;
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

const textarea = css`
  width: 100%;
  min-height: 216px;
  resize: none;

  background-color: ${BACKGROUND_COLOR.NAVY_3};
  color: ${FONT_COLOR.WHITE};
  border-radius: 12px;
  border-top-left-radius: 0;
  border: 1px solid rgba(255, 255, 255, 0.06);

  padding: 28px 24px 40px;

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

const reviewContainer = css`
  width: 100%;
  min-height: 216px;
  background-color: ${BACKGROUND_COLOR.NAVY_3};
  color: ${FONT_COLOR.WHITE};

  border-radius: 12px;
  border-top-left-radius: 0;
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 28px 20px 20px;
`;

const reviewInputContainer = css`
  padding-bottom: 12px;
  border-bottom: 1px solid ${BACKGROUND_COLOR.NAVY_4};
  display: flex;
  align-items: center;
  gap: 12px;
`;

const reviewInput = css`
  background-color: ${BACKGROUND_COLOR.NAVY_4};
  border-radius: 6px;
  height: 28px;
  flex: 1;
  color: ${FONT_COLOR.WHITE};
  padding: 6px 12px;
`;

const reviewLoadBtn = ({ isEnable }: { isEnable: boolean }) => css`
  background-color: ${isEnable ? POINT_COLOR.MAIN : BACKGROUND_COLOR.FIELD_10};
  width: 76px;
  height: 36px;
  color: ${isEnable ? FONT_COLOR.GRAY_1 : FONT_COLOR.GRAY_2};
  font-weight: 600;
  font-size: 13px;
  line-height: 15px;
  border-radius: 8px;
`;

const timelineContainer = css`
  padding: 10px 0;
  ${mq('desktop')} {
    gap: 12px;
    display: flex;
  }
`;

const timeline = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 44px;
  min-width: 312px;
  padding: 12px 24px;
  background-color: ${BACKGROUND_COLOR.NAVY_4};
  border-radius: 6px;

  ${mq('desktop')} {
    flex: 1;
  }
`;

const timelineLeftArea = css`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
`;

const timelineCalendar = css`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const timelineInputContainer = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const timelineTitleInput = css`
  width: 100%;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-bottom: 2px solid ${BACKGROUND_COLOR.FIELD_10};
  background-color: transparent;
  color: ${FONT_COLOR.WHITE};
  padding-bottom: 4px;
  outline: none;
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;

  &:focus {
    border-bottom: 2px solid ${FONT_COLOR.WHITE};
  }
`;

const timelineSummaryInput = css`
  width: 100%;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-bottom: 2px solid ${BACKGROUND_COLOR.FIELD_10};
  background-color: transparent;
  color: ${FONT_COLOR.WHITE};
  padding: 2px 0;
  outline: none;

  &:focus {
    border-bottom: 2px solid ${FONT_COLOR.WHITE};
  }
`;

const timelineSubmitBtnContainer = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 6px;

  ${mq('desktop')} {
    margin-top: 0;
    align-items: flex-end;
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

const otherCardContainer = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

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
  wrapper,
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
  reviewContainer,
  reviewInputContainer,
  reviewInput,
  reviewLoadBtn,
  timelineContainer,
  timeline,
  timelineLeftArea,
  timelineCalendar,
  timelineInputContainer,
  timelineTitleInput,
  timelineSummaryInput,
  timelineSubmitBtnContainer,
  textareaBottomContainer,
  elementContainer,
  elementTitle,
  titleRight,
  iconContainer,
  otherCardContainer,
  desktopOtherCard,
  footer,
  divider,
};

export default styles;
