import styled from '@emotion/styled';
import { FONT_COLOR, BACKGROUND_COLOR } from '@/constants/color';
import { mq } from '@/styles/mediaQuery';
import { Z_INDEX_LEVEL } from '@/constants/zIndex';

const OutLayer = styled.div`
  z-index: ${Z_INDEX_LEVEL['MODAL']};
  background: rgba(0, 0, 0, 0.5);

  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalContainer = styled.div<{ isConfirm: boolean }>`
  position: fixed;
  width: ${({ isConfirm }) => (isConfirm ? '300px' : '100%')};
  height: ${({ isConfirm }) => (isConfirm ? 'auto' : '95%')};
  // Modal Component 항상 중앙유지
  left: 50%;
  top: 50%;
  transform: translate(-50%, -47%);

  background: ${BACKGROUND_COLOR.NAVY_3};
  // padding 의 경우 figma상의 최소치 설정
  padding: ${({ isConfirm }) => (isConfirm ? '28px 18px' : '32px 40px')};
  text-align: center;
  border-top-left-radius: ${({ isConfirm }) => (isConfirm ? '12px' : '20px')};
  border-top-right-radius: ${({ isConfirm }) => (isConfirm ? '12px' : '20px')};
  border-bottom-left-radius: ${({ isConfirm }) => (isConfirm ? '12px' : '0px')};
  border-bottom-right-radius: ${({ isConfirm }) => (isConfirm ? '12px' : '0px')};

  // outLayer보다 높은 z-index 값 부여
  z-index: ${Z_INDEX_LEVEL['MODAL']};
  ${mq('desktop')} {
    height: auto;
    width: ${({ isConfirm }) => (isConfirm ? '300px' : '656px')};
    padding: ${({ isConfirm }) => (isConfirm ? '32px 20px' : '32px 40px')};

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
