import styled from '@emotion/styled';
import { CardProps } from './types';

import { BACKGROUND_COLOR, FONT_COLOR, POINT_COLOR } from '@/constants/color';

export const CardContainer = styled.div<{ size: CardProps['size'] }>`
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: ${BACKGROUND_COLOR.NAVY_1};
  color: ${FONT_COLOR.WHITE};
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 9px;
  width: 100%;
  min-width: ${({ size }) => (size === 'sm' ? '284px' : size === 'mobile' ? '328px' : '384px')};
  height: ${({ size }) => (size === 'sm' ? '132px' : '170px')};

  padding: ${({ size }) => (size === 'sm' ? '16px 23px 16px 20px' : size === 'mobile' ? '35px' : '35px 40px')};

  &:hover {
    transition: all 0.15s ease 0s;
    background: rgba(255, 255, 255, 0.06);
    color: ${FONT_COLOR.WHITE};
  }
`;

export const CardBodyContent = styled.div`
  cursor: pointer;
`;

export const TagWrapper = styled.div`
  display: inline;
  cursor: pointer;
`;

export const CardHeader = styled.div`
  position: relative;
  margin-bottom: 4px;
`;

export const CardBodyDesc = styled.div`
  width: 241px;
  > p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;
export const CardUserProfile = styled.div`
  margin-right: 8px;
  transition: all 0.3s ease;
  > span {
    ::after {
      content: '';
      width: auto;
      height: 1px;
      display: block;
      background: ${FONT_COLOR.GRAY_3};
      transition: 0.2s;
      opacity: 0;
    }
    :hover:after {
      opacity: 1;
    }
  }
`;

const BadgeTopSmWidth = 22;
const BadgeTopSmHeight = 27;

const BadgeTopLgWidth = 34;
const BadgeTopLgHeight = 41.25;

const BadgeBottomSmHeight = 9;
const BadgeBottomLgHeight = 13.75;

export const BadgeTop = styled.div<Pick<CardProps, 'size'>>`
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  top: -1px;
  right: ${({ size }) => (size === 'sm' || size === 'mobile' ? '16px' : '20px')};
  width: ${({ size }) => (size === 'sm' || size === 'mobile' ? `${BadgeTopSmWidth}px` : `${BadgeTopLgWidth}px`)};
  height: ${({ size }) => (size === 'sm' || size === 'mobile' ? `${BadgeTopSmHeight}px` : `${BadgeTopLgHeight}px`)};
  background-color: ${POINT_COLOR.SAVE};
  &::after {
    content: '';
  }
`;
export const CrownIcon = styled.div<Pick<CardProps, 'size'>>`
  display: block;
  width: ${({ size }) => (size === 'sm' || size === 'mobile' ? '14' : '21.64')}px;
  height: ${({ size }) => (size === 'sm' || size === 'mobile' ? '14' : '21.39')}px;
  margin-bottom: ${({ size }) => (size === 'sm' || size === 'mobile' ? '3' : '4.58')}px;
`;

// border에 1px이 존재해서 1px만큼 더위로 올려놔야함
export const BadgeBottom = styled.div<Pick<CardProps, 'size'>>`
  position: absolute;
  right: ${({ size }) => (size === 'sm' || size === 'mobile' ? '16px' : '20px')};
  top: ${({ size }) =>
    size === 'sm' || size === 'mobile' ? `calc(${BadgeTopSmHeight}px - 1px)` : `calc(${BadgeTopLgHeight}px - 1px)`};
  width: 0;
  height: 0;
  border-bottom: ${({ size }) =>
      size === 'sm' || size === 'mobile' ? `${BadgeBottomSmHeight}px` : `${BadgeBottomLgHeight}px`}
    solid transparent;
  border-top: ${({ size }) =>
      size === 'sm' || size === 'mobile' ? `${BadgeBottomSmHeight}px` : `${BadgeBottomLgHeight}px`}
    solid ${POINT_COLOR.SAVE};
  border-left: ${({ size }) =>
      size === 'sm' || size === 'mobile' ? `${BadgeTopSmWidth / 2}px` : `${BadgeTopLgWidth / 2}px`}
    solid transparent;
  border-right: ${({ size }) =>
      size === 'sm' || size === 'mobile' ? `${BadgeTopSmWidth / 2}px` : `${BadgeTopLgWidth / 2}px`}
    solid transparent;
`;

export const CardInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
  cursor: pointer;
  > img {
    border-radius: 47.5px;
    margin-right: 6px;
  }
`;
