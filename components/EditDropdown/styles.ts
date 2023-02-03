import styled from '@emotion/styled';
import { EditDropdownProps } from './types';

export const MoreButtonWrapper = styled.ul<{ moreButtonPositionCss: EditDropdownProps['moreButtonPositionCss'] }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  top: 4px;
  right: 4px;
  // props로 받은 css 통으로 복붙
  ${(props) => props.moreButtonPositionCss}
  li {
    background: #ffffff;
    height: 2px;
    width: 2px;
    line-height: 0;
    margin-top: 2px;
    border-radius: 50%;
    pointer-events: none;
  }
`;

export const EditDropdownWrapper = styled.div<{ editListPositionCss: EditDropdownProps['editListPositionCss'] }>`
  position: absolute;
  z-index: 99px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 80px;
  height: 72px;
  right: -10px;
  top: 32px;
  // props로 받은 css 통으로 복붙
  ${(props) => props.editListPositionCss}
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

export const EditDropdownItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-left: 12px;
  padding-top: 6px;
  padding-bottom: 6px;
  cursor: pointer;
  &:hover {
    transition: all 0.15s ease 0s;
    background: #e0e6ee;
  }
`;
