import styled from '@emotion/styled';
import { FONT_COLOR, BACKGROUND_COLOR } from '@/constants/color';
import Close from '@/assets/svgs/ic_x.svg';

const OutLayer = styled.div`
  z-index: 2;
  background: ${BACKGROUND_COLOR.FIELD_10};

  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalContainer = styled.div`
  /* position: relative; */
  position: absolute;
  width: 656px;
  height: 521px;
  // Modal Component 항상 중앙유지
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  background: ${BACKGROUND_COLOR.NAVY_3};
  border-radius: 12px;
  // padding 의 경우 figma상의 최소치 설정
  padding: 86px 78px 40px 78px;
  text-align: center;
  // outLayer보다 높은 z-index 값 부여
  z-index: 5;
`;

const CloseButton = styled(Close)`
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
