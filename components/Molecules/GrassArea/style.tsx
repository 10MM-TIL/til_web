import styled from '@emotion/styled';
import { BACKGROUND_COLOR } from '@/constants/color';

export const GrassAreaContainer = styled.div`
  padding-top: 10px;
  margin: 0 auto;
  max-width: 337px;
  background-color: ${BACKGROUND_COLOR.NAVY_1};

  @media screen and (min-width: 1194px) {
    max-width: 780px;
  }
`;

export const GrassNavigationPrevButton = styled.button`
  top: -25px;
  right: 42px;
  transform: rotate(180deg);
`;
export const GrassNavigationNextButton = styled.button`
  top: -25px;
  right: 12px;
`;

export const GrassSwiper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  button {
    display: flex;
    align-items: center;
    position: absolute;
  }
  .swiper {
    padding-top: 20px;
    &-slide {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const GrassDimmedArea = styled.div`
  z-index: 100;

  position: absolute;
  top: 20px;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(30, 37, 47, 0.5);

  border-radius: 12px;
`;
