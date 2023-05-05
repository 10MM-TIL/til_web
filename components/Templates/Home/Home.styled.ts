import { BACKGROUND_COLOR, FONT_COLOR } from '@/constants/color';
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
  z-index: 100; // TODO Z-Index 관련 정리
  padding-top: 35px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 46px;
`;

const container = css`
  padding: 84px 24px;
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
  z-index: ${selectedTab === 'MEMO' ? 10 : 5};
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
  z-index: ${selectedTab === 'MEMO' ? 5 : 10};
  display: flex;
  justify-content: center;
  padding: ${selectedTab === 'MEMO' ? '11px 30px 0 40px' : '11px 30px'};
`;

const textarea = ({ selectedTab }: { selectedTab: 'MEMO' | 'REVIEW' }) => css`
  width: 100%;
  min-height: 216px;
  resize: none;

  z-index: 100 !important;
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
  bottom: ${selectedTab === 'MEMO' ? '16px' : '20px'};
  right: ${selectedTab === 'MEMO' ? '136px' : '26px'};
`;

const styles = {
  topContainer,
  topImageContainer,
  topTextContainer,
  container,
  textareaContainer,
  memoTab,
  reviewTab,
  textarea,
  textareaBottomContainer,
};

export default styles;
