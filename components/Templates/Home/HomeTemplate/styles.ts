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
  max-width: 1117px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 24px;
  gap: 53px;
  ${mq('desktop')} {
    flex-direction: row;
  }
`;

const container = css`
  /* margin: 84px 24px; */
  margin-top: 84px;
  margin-bottom: 84px;
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

const styles = {
  wrapper,
  topContainer,
  topImageContainer,
  topTextContainer,
  desktopContainer,
  container,
  textareaContainer,
  titleRight,
  iconContainer,
  otherCardContainer,
};

export default styles;
