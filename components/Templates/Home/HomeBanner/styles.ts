import styled from '@emotion/styled';
import { FONT_COLOR } from '@/constants/color';
import { css } from '@emotion/react';
import { mq } from '@/styles/mediaQuery';

export const homeSwiperCustom = css`
  .swiper-pagination-bullet {
    width: 4px;
    height: 4px;
    margin: 0 2px !important;
  }
  .swiper-button-prev {
    left: -8px;
    color: ${FONT_COLOR.WHITE};

    &:after {
      font-size: 17px;
    }
  }
  .swiper-button-next {
    right: -8px;
    color: ${FONT_COLOR.WHITE};

    &:after {
      font-size: 17px;
    }
  }

  .swiper-pagination .swiper-pagination-bullet-active {
    background-color: ${FONT_COLOR.WHITE};
  }
  .swiper-slide {
    ${mq('desktop')} {
      padding: 0 24px;
    }
  }
`;
export const swiperWrapper = css`
  padding: 0 24px;
`;
export const HomeBanner = styled.section`
  width: 100%;
  background-color: #222f41;
`;
export const SwiperContainer = styled.div`
  max-width: calc(1117px + 24px + 24px);
  margin: 0 auto;
  /* padding: 0 24px; */
`;

export const SwiperSlideContainer = styled.div`
  display: flex;
  position: relative;
`;
export const SwiperSlideContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
  padding: 46px 5px 52px 5px;
  flex-basis: 659px;
  ${mq('desktop')} {
    gap: 30px;
    padding: 86px 24px 78px 24px;
  }
`;

export const SlideTitle = styled.div`
  color: ${FONT_COLOR.WHITE};
  font-size: 23px;
  font-weight: 700;
  line-height: 36px; /* 150% */
  padding-left: 20px;
  ${mq('desktop')} {
    padding-left: 0px;
    font-size: 26px;
    line-height: 39px; /* 150% */
  }
`;

export const SwiperSlide1DescContent = styled.div`
  display: flex;
  color: ${FONT_COLOR.WHITE};
  font-size: 9px;
  line-height: 12.484px; /* 138.716% */
  letter-spacing: -0.022px;

  ${mq('desktop')} {
    gap: 36px;
    font-size: 16px;
    line-height: 20px; /* 137.5% */
    letter-spacing: -0.038px;
  }
`;

export const SwiperSlide1Img = styled.div`
  position: absolute;
  z-index: -1;
  right: 0;
  bottom: 0;
  width: 375px;
  height: 174px;
  background-image: url('/images/home/slide1_m.png');
  background-repeat: no-repeat;
  background-size: cover;
  ${mq('desktop')} {
    width: 659px;
    height: 303px;
    background-image: url('/images/home/slide1.png');
  }
`;

export const Slide1Desc = styled.div`
  display: flex;
  gap: 4px;
  flex: 1;
`;

export const SwiperSlide2DescContent = styled.div`
  display: flex;
  gap: 36px;
  color: ${FONT_COLOR.WHITE};
`;

export const SwiperSlide2Img = styled.div`
  position: absolute;
  z-index: -1;
  right: 0;
  bottom: 0;
  width: 375px;
  height: 174px;
  background-image: url('/images/home/slide2_m.png');
  background-repeat: no-repeat;
  background-size: cover;
  ${mq('desktop')} {
    width: 659px;
    height: 303px;
    background-image: url('/images/home/slide2.png');
  }
`;

export const SwiperSlide2Ul = styled.ul`
  color: ${FONT_COLOR.WHITE};
  font-size: 9px;
  line-height: 12px; /* 133.333% */
  letter-spacing: -0.022px;
  padding-left: 20px;

  li {
    list-style: decimal;
    margin-left: 20px;
  }

  ${mq('desktop')} {
    padding-left: 0px;
    font-size: 16px;
    line-height: 24px; /* 150% */
    letter-spacing: 0.061px;
  }
`;
