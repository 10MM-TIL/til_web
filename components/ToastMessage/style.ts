import styled from '@emotion/styled';
import { POINT_COLOR, BACKGROUND_COLOR } from '@/constants/color';

const ToastMessageContainer = styled.div`
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px;
  gap: 10px;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 90px;
  width: 300px;
  height: 52px;

  background: ${BACKGROUND_COLOR.FIELD_10};

  border: 1px solid ${POINT_COLOR.MAIN};
  /* Tooltip */

  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.3);
  border-radius: 59px;
`;

export { ToastMessageContainer };
