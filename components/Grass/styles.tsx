import styled from '@emotion/styled';
import { GrassStatus } from './types';
import { POINT_COLOR, BACKGROUND_COLOR } from '@/constants/color';
import { mq } from '@/styles/mediaQuery';

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

  ${mq('desktop')} {
    width: 189px;
    height: 191px;
    border-radius: 11px;
    padding: 16px 17px 19px 17px;
  }
`;

export const GrassDate = styled.div`
  margin-bottom: 13px;

  ${mq('desktop')} {
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

  width: 101px;
  height: 48px;
  z-index: 9999999;
  box-shadow: rgb(0 0 0 / 20%) 1px 2px 10px;
  transition: opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s,
    transform 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;
  background: ${BACKGROUND_COLOR.NAVY_4};
  filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.3));

  border-radius: 12px;
  top: 0px;
  left: 0px;
  ${({ isHover }) => (!isHover ? 'visibility: hidden; opacity: 0;' : 'will-change: transform;')};
  pointer-events: none;

  /* ${mq('desktop')} {
    width: 171px;
    height: 50px;
  } */
`;

export const GrassHoverWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 16px 18.5px;

  > div:nth-of-type(1) {
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
  border: inherit;
  width: 11px;
  height: 12px;
  border-radius: 0 0 0 2px;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;
  filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.3));
`;
