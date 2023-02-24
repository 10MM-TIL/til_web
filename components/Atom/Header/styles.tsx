import styled from '@emotion/styled';
import { POINT_COLOR, BACKGROUND_COLOR } from '@/constants/color';
import { mq } from '@/styles/mediaQuery';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 58px;
  padding-top: 29px;
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
