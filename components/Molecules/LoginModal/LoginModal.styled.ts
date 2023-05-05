import { BACKGROUND_COLOR, FONT_COLOR } from '@/constants/color';
import { mq } from '@/styles/mediaQuery';
import { css } from '@emotion/react';

const outside = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: rgba(25, 31, 40, 0.5);
  z-index: 9999; // TODO Z-Index 정리

  ${mq('desktop')} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const container = css`
  margin-top: 56px;
  background-color: ${BACKGROUND_COLOR.NAVY_3};
  min-height: calc(100vh - 56px);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  ${mq('desktop')} {
    width: 656px;
    margin: 0 auto;
    min-height: auto;
    border-radius: 20px;
  }
`;

const top = css`
  width: 100%;
  display: flex;
  justify-content: end;
  padding: 24px;
`;

const msgContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  gap: 16px;
`;

const iconContainer = css`
  padding: 60px 0;
  display: flex;
  justify-content: center;
`;

const btnContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  ${mq('desktop')} {
    padding-bottom: 68px;
  }
`;

const googleBtn = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${FONT_COLOR.WHITE};
  padding: 14px 0;
  width: 328px;
  border-radius: 12px;
  gap: 6px;

  ${mq('desktop')} {
    width: 450px;
  }
`;

const styles = {
  outside,
  container,
  top,
  msgContainer,
  iconContainer,
  btnContainer,
  googleBtn,
};

export default styles;
