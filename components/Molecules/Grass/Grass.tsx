import { useCallback, useState, useRef, useEffect } from 'react';
import { Grass } from '@/components/Grass';
import { useCalendar } from '@/hooks/useCalendarData';
import * as Typo from '@/components/Typography';
import * as Styled from './style';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { IconGrassArrow } from '@/assets/svgs/IconGrassArrow';

import { Swiper, SwiperSlide, SwiperProps, SwiperRef } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

export const GrassArea = () => {
  // 추후 잔디의 데이터를 받아오면 수정이 필요함
  const [stackJan, setStackJan] = useState([
    new Date(2023, 0, 1).toString(),
    new Date(2023, 0, 3).toString(),
    new Date(2023, 0, 12).toString(),
    new Date(2023, 0, 13).toString(),
    new Date(2023, 0, 14).toString(),
    new Date(2023, 0, 15).toString(),
    new Date(2023, 0, 29).toString(),
  ]);

  const [stackFeb, setStackFeb] = useState([
    new Date(2023, 1, 1).toString(),
    new Date(2023, 1, 3).toString(),
    new Date(2023, 1, 12).toString(),
    new Date(2023, 3, 13).toString(),
    new Date(2023, 1, 14).toString(),
    new Date(2023, 1, 15).toString(),
    new Date(2023, 1, 29).toString(),
  ]);

  const [stackMar, setStackMar] = useState([
    new Date(2023, 2, 1).toString(),
    new Date(2023, 2, 3).toString(),
    new Date(2023, 2, 11).toString(),
    new Date(2023, 2, 12).toString(),
    new Date(2023, 2, 13).toString(),
    new Date(2023, 2, 22).toString(),
    new Date(2023, 2, 23).toString(),
    new Date(2023, 2, 24).toString(),
    new Date(2023, 2, 25).toString(),
    new Date(2023, 2, 26).toString(),
    new Date(2023, 2, 27).toString(),
    new Date(2023, 2, 28).toString(),
    new Date(2023, 2, 29).toString(),
  ]);

  const [stackApr, setSTackApr] = useState([
    new Date(2023, 3, 1).toString(),
    new Date(2023, 3, 3).toString(),
    new Date(2023, 3, 12).toString(),
    new Date(2023, 3, 13).toString(),
    new Date(2023, 3, 14).toString(),
    new Date(2023, 3, 15).toString(),
    new Date(2023, 3, 29).toString(),
  ]);

  const grassDataForJan = useCalendar(2023, 1, stackJan);
  const grassDataForFeb = useCalendar(2023, 2, stackFeb);
  const grassDataForMar = useCalendar(2023, 3, stackMar);
  const grassDataForApr = useCalendar(2023, 4, stackApr);

  // const [swiperSetting, setSwiperSetting] = useState<SwiperProps | null>(null);
  // const navigationPrevRef = useRef<HTMLButtonElement>(null);
  // const navigationNextRef = useRef<HTMLButtonElement>(null);

  const clickCellTest = useCallback((date: string) => {
    // 데이터 조정은 여기서 수행
    // setGrassData();
    console.log(`클릭한 날짜 정보: ${date}`);
  }, []);

  // useEffect(() => {
  //   if (!swiperSetting) {
  //     setSwiperSetting({
  //       modules: [Navigation],
  //       spaceBetween: 10,
  //       navigation: {
  //         prevEl: navigationPrevRef.current, // 이전 버튼
  //         nextEl: navigationNextRef.current, // 다음 버튼
  //       },
  //       slidesPerView: 1,
  //       onBeforeInit: (swiper: SwiperCore) => {
  //         if (typeof swiper.params.navigation !== 'boolean') {
  //           if (swiper.params.navigation) {
  //             swiper.params.navigation.prevEl = navigationPrevRef.current;
  //             swiper.params.navigation.nextEl = navigationNextRef.current;
  //           }
  //         }
  //         swiper.navigation?.update();
  //       },
  //       breakpoints: {
  //         // when window width is >= 1194px
  //         1193: {
  //           slidesPerView: 4,
  //         },
  //       },
  //     });
  //   }
  // }, [swiperSetting]);

  // const GrassWrapper = styled.div`
  //   flex-basis: 100%;

  //   @media screen and (min-width: 1194px) {
  //     flex-basis: 0;
  //     flex-grow: 1;
  //   }
  // `;

  // const GrassNavigationButton = styled.button``;
  // const StyledRoot = styled.div`
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   position: relative;

  //   button {
  //     padding: 0;
  //     background: none;
  //     border: none;
  //   }
  //   .swiper {
  //     &-slide {
  //       display: flex;
  //       justify-content: center;
  //       align-items: center;
  //     }
  //   }
  // `;

  return (
    <Styled.GrassAreaContainer>
      <div>
        <Typo.H1 color='#D2D2D2'>내가 모은 기록</Typo.H1>
      </div>
      <Grass date={'2023 Jan'} GrassData={grassDataForJan} onClickCell={clickCellTest} />
      <Grass date={'2023 Feb'} GrassData={grassDataForFeb} onClickCell={clickCellTest} />
      <Grass date={'2023 Mar'} GrassData={grassDataForMar} onClickCell={clickCellTest} />
      <Grass date={'2023 Apr'} GrassData={grassDataForApr} onClickCell={clickCellTest} />

      {/* {swiperSetting && (
        <StyledRoot>
          <Swiper {...swiperSetting}>
            <SwiperSlide>
              <Grass date={'2023 Jan'} GrassData={grassDataForJan} onClickCell={clickCellTest} />
            </SwiperSlide>
            <SwiperSlide>
              <Grass date={'2023 Feb'} GrassData={grassDataForFeb} onClickCell={clickCellTest} />
            </SwiperSlide>
            <SwiperSlide>
              <Grass date={'2023 Mar'} GrassData={grassDataForMar} onClickCell={clickCellTest} />
            </SwiperSlide>
            <SwiperSlide>
              <Grass date={'2023 Apr'} GrassData={grassDataForApr} onClickCell={clickCellTest} />
            </SwiperSlide>
          </Swiper>
          <div>
            <GrassNavigationButton ref={navigationPrevRef}>
              <IconGrassArrow></IconGrassArrow>
            </GrassNavigationButton>
            <GrassNavigationButton ref={navigationNextRef}>
              <IconGrassArrow></IconGrassArrow>
            </GrassNavigationButton>
          </div>
        </StyledRoot> 
      )} */}
    </Styled.GrassAreaContainer>
  );
};
