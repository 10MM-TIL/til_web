import styled from '@emotion/styled';
import { POINT_COLOR, BACKGROUND_COLOR } from '@/constants/color';
import { mq } from '@/styles/mediaQuery';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  background: rgba(25, 31, 40, 0.9);
  backdrop-filter: blur(9.5px);
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  padding-left: 58px;
  padding-right: 42px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  gap: 25px;
  justify-content: center;
  align-items: center;
`;

export const HeaderRight = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
`;

export const ProfileIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: white;
`;
