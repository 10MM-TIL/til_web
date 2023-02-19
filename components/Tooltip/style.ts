import styled from '@emotion/styled';
import { POINT_COLOR } from '@/constants/color';
import Close from '../../assets/svgs/ic_x.svg';

const TootlipContainer = styled.div<{ leftPixel: string }>`
  width: 260px;
  height: 60px;
  display: flex;

  flex-direction: column;
  align-items: center;
  margin-bottom: 4px;
  position: relative;
  top: -95px;
  left: ${(props) => props.leftPixel};
`;

const ContentContainer = styled.div`
  width: 100%;
  bottom: 20%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 3;

  padding: 16px 38px 16px 12px;
  gap: 4px;
  border-radius: 12px;

  background: ${POINT_COLOR.MAIN};
`;

const Direction = styled.div`
  width: 22px;
  height: 30px;
  background: ${POINT_COLOR.MAIN};
  border-radius: 2px;
  transform: rotate(120deg) skewX(-30deg) translateX(-41%) translateY(16%);
`;

const CloseButton = styled(Close)`
  position: absolute;
  width: 16px;
  height: 16px;
  top: 16px;
  right: 16px;
  z-index: 4;
  :hover {
    cursor: pointer;
  }
`;
export { TootlipContainer, ContentContainer, Direction, CloseButton };
