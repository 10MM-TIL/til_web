import styled from '@emotion/styled';
import { FONT_COLOR, BACKGROUND_COLOR } from '@/constants/color';
import { mq } from '@/styles/mediaQuery';

const OutLayer = styled.div`
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);

  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalContainer = styled.div`
  /* position: relative; */
  position: fixed;
  width: 100%;
  height: 95%;
  // Modal Component 항상 중앙유지
  left: 50%;
  top: 50%;
  transform: translate(-50%, -47%);

  background: ${BACKGROUND_COLOR.NAVY_3};
  // padding 의 경우 figma상의 최소치 설정
  padding: 86px 78px 40px 78px;
  text-align: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  // outLayer보다 높은 z-index 값 부여
  z-index: 5;
  ${mq('desktop')} {
    height: 580px;
    width: 656px;
    border-radius: 12px;
    transform: translate(-50%, -50%);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  width: 24px;
  height: 24px;
  right: 24px;
  top: 24px;
  & path {
    fill: ${FONT_COLOR.GRAY_2};
  }
  :hover {
    cursor: pointer;
  }
`;

export { ModalContainer, CloseButton, OutLayer };
