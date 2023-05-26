import styled from '@emotion/styled';
import { POINT_COLOR } from '@/constants/color';

const ToggleContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: space-around;
  padding: 10px 12px 10px 12px;
  gap: 8px;
  width: 72px;
  height: 36px;
  background: #636c78; // 여기 색상 constant처리 할것
  border-radius: 40px;

  :hover {
    cursor: pointer;
  }

  user-select: none; // click 빠르게 했을 때 텍스트 선택 되는 부분 block
`;

const ToggleButton = styled.div<{ isOn: boolean }>`
  position: absolute;
  background: ${(props) => (props.isOn ? POINT_COLOR.MAIN : POINT_COLOR.ERROR)};
  width: 31px;
  height: 31px;
  border-radius: 100%;

  transition: 0.3s;
  // translate 깔끔하게 처리하는 방법 생각해보기
  transform: ${(props) => (props.isOn ? 'translate(-56%, -24%)' : 'translate(56%, -24%)')};
`;

export { ToggleContainer, ToggleButton };
