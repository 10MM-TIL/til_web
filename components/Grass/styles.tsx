import styled from '@emotion/styled';
import { GrassStatus } from './types';
import { POINT_COLOR, BACKGROUND_COLOR } from '@/constants/color';

export const GrassContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 17px 19px 17px;
  width: 189px;
  height: 191px;
  background: #1e252f;
  border-radius: 11px;

  > div {
  }
`;

export const GrassDate = styled.div`
  margin-bottom: 8px;
`;

export const GrassRowG = styled.g`
  box-shadow: 0px 0px 6px rgba(0, 168, 168, 0.18);
`;

// color 시스템 추가 적용 필요
export const GrassCell = styled('rect')<{ cellStatus: GrassStatus }>`
  cursor: ${({ cellStatus }) => (cellStatus !== 'disabled' ? 'pointer' : 'default')};
  fill: ${({ cellStatus }) =>
    cellStatus === 'stack' ? POINT_COLOR.MAIN : cellStatus === 'unstack' ? '#3B4652' : 'rgba(0, 0, 0, 0.12)'};
  background: ${({ cellStatus }) =>
    cellStatus === 'stack' ? POINT_COLOR.MAIN : cellStatus == 'unstack' ? '#3B4652' : 'rgba(0, 0, 0, 0.12)'};
`;

export const GrassSVGWrapper = styled.div`
  position: relative;
  height: 132px;
  position: relative;
`;

export const GrassHoverContainer = styled.div<{ isHover: boolean }>`
  position: absolute;
  display: block;
  white-space: nowrap;
  width: 171px;
  height: 50px;
  z-index: 9999999;
  box-shadow: rgb(0 0 0 / 20%) 1px 2px 10px;
  transition: opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s,
    transform 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;
  background: ${BACKGROUND_COLOR.NAVY_4};
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  padding: 13px 6px 13px 21px;
  top: 0px;
  left: 0px;
  ${({ isHover }) => (!isHover ? 'visibility: hidden; opacity: 0;' : 'will-change:transform;')};
  pointer-events: none;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
  }
`;
