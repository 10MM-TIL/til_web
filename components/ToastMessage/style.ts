import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';
import { POINT_COLOR, BACKGROUND_COLOR } from '@/constants/color';
import { mq } from '@/styles/mediaQuery';

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translate3d(-50%, -80%, 0)',
  },
  to: {
    opacity: 1,
    transform: 'translate3d(-50%, 0, 0)',
  },
});

const fadeOut = keyframes({
  '0%': {
    opacity: 1,
    transform: 'translate3d(-50%, 0, 0)',
  },
  to: {
    opacity: 0,
    transform: 'translate3d(-50%, -80%, 0)',
  },
});

const ToastMessageContainer = styled.div<{ isOpen: boolean }>`
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px;
  gap: 10px;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 60px;
  width: 270px;
  height: 52px;
  background: ${BACKGROUND_COLOR.FIELD_10};

  border: 1px solid ${POINT_COLOR.MAIN};
  /* Tooltip */

  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.3);
  border-radius: 59px;

  /* blur */
  backdrop-filter: blur(9.5px);
  /* animation */
  /* animation: ${(props) => (props.isOpen ? fadeIn : fadeOut)} 0.3s; */
  -webkit-animation: ${(props) =>
    props.isOpen
      ? css`
          ${fadeIn} 0.5s, ${fadeOut} 0.5s 2.5s
        `
      : ''};
  animation: ${(props) =>
    props.isOpen
      ? css`
          ${fadeIn} 0.5s, ${fadeOut} 0.5s 2.5s
        `
      : ''};
  /* 텍스트 선택 되는 부분 block */
  user-select: none;
  ${mq('desktop')} {
    top: 90px;
    width: 300px;
  }
`;

export { ToastMessageContainer };
