import styled from '@emotion/styled';
import { GrassStatus } from './types';
import { POINT_COLOR, BACKGROUND_COLOR } from '@/constants/color';
// TODO memdia query 적용 필요

export const GrassContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 28px 31px 34px 31px;
  width: 327px;
  height: 334px;
  background: #1e252f;
  border-radius: 19px;

  @media screen and (min-width: 1194px) {
    width: 189px;
    height: 191px;
    border-radius: 11px;
    padding: 16px 17px 19px 17px;
  }
`;

export const GrassDate = styled.div`
  margin-bottom: 13px;

  @media screen and (min-width: 1194px) {
    margin-bottom: 8px;
  }
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

  width: 280px;
  height: 60px;
  z-index: 9999999;
  box-shadow: rgb(0 0 0 / 20%) 1px 2px 10px;
  transition: opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s,
    transform 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;
  background: ${BACKGROUND_COLOR.NAVY_4};
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  top: 0px;
  left: 0px;
  ${({ isHover }) => (!isHover ? 'visibility: hidden; opacity: 0;' : 'will-change: transform;')};
  pointer-events: none;

  @media screen and (min-width: 1194px) {
    width: 171px;
    height: 50px;
  }
`;

export const GrassHoverWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 13px 6px 13px 21px;

  > div:nth-of-type() {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
  }
`;

export const RoundArrow = styled.div`
  position: absolute;
  display: block;
  height: 20px;
  width: 20px;
  border: inherit;
  background: ${BACKGROUND_COLOR.NAVY_4};
  bottom: -10px;
  left: 0px;
  clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
  border-radius: 0 0 0 0.25em;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.3);
`;
