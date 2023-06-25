import { useCallback, useState, useRef, useEffect } from 'react';
import { Grass, GrassData } from '@/components/Atom/Grass';
import { useCalendarData, monthYearData } from '@/hooks/useCalendarData';
import * as Typo from '@/components/Atom/Typography';
import * as Styled from './style';
import { format, getMonth, getYear, getDaysInMonth } from 'date-fns';
import { IconGrassArrow } from '@/assets/svgs/IconGrassArrow';

import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react';
import SwiperCore, { Navigation, Virtual } from 'swiper';
import { GrassAreaProps, GrassStackedData } from './types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// !! 추후에 없어질 함수 (임시)
// 잔디가 쌓인 데이터(랜덤)
const addRandomDateToKey = (year: number, month: number) => {
  let arr: string[] = [];
  // 1 ~ 6
  const countRandom = Math.floor(Math.random() * 6) + 1;
  arr = new Array(countRandom).fill('').map((i) => {
    const randomDate = new Date(
      year,
      month - 1,
      Math.floor(Math.random() * getDaysInMonth(new Date(year, month - 1)) + 1),
    ).toString();
    return i + randomDate;
  });
  // 현재 상태를 복사합니다.
  // Object.entries(stackBrick).forEach(([key, values]) => {
  //   const newStackBrick = [...values];
  //   arr[key] = newStackBrick;
  // });

  // 무작위로 선택된 키에 새로운 날짜를 추가합니다.

  // 상태를 업데이트합니다.
  return arr;
};

const MonthGrass = ({
  GrassData,
  date,
  onClickCell,
}: {
  index: number;
  date: string;
  GrassData: GrassData;
  onClickCell: (date: string) => void;
}) => {
  return <Grass date={date} GrassData={GrassData} onClickCell={onClickCell} />;
};

export const GrassArea = ({ title, onClick, onClickNext, onClickPrev, data }: GrassAreaProps) => {
  // 추후 잔디의 데이터를 받아오면 수정이 필요함
  const [stackBrick, setStackBrick] = useState<GrassStackedData>(data);
  // console.log('stackBrick', stackBrick);
  // console.log('data', data);
  // const [stackBrick, setStackBrick] = useState<GrassStackedData>({
  //   1: ['Sun May 14 2023 00:00:00 GMT+0900 (한국 표준시)'],
  //   2: [],
  //   3: [],
  //   4: ['Sat Aug 26 2023 00:00:00 GMT+0900 (한국 표준시)'],
  //   5: [],
  // });

  const [nowYear, setNowYear] = useState(getYear(new Date()));
  const [nowMonth, setNowMonth] = useState(getMonth(new Date()) + 1);
  const [grassData, setGrassData, yearMonthArr, setYearMonthArr, setDateArrayForGrass] = useCalendarData(
    nowYear,
    nowMonth,
    stackBrick,
  );
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);
  const prependNumber = useRef(1); // virtual Index
  useEffect(() => {
    setStackBrick(data);
  }, [data]);
  // TODO 수정 필요! 현재는 매번 랜덤한 값이 들어와 이동할때마다 바뀜
  // useEffect(() => {
  //   // 추가 후 삭제 해서 두번 실행됌
  //   yearMonthArr.forEach((i, index) => {
  //     setStackBrick((prev) => ({
  //       ...prev,
  //       [index + 1]: addRandomDateToKey(i.year, i.month),
  //     }));
  //   });
  // }, [yearMonthArr]);

  // 현재월 + 5 (4니까 다음이동할때 애니메이션이 동작안함 > 이유 몰?루?)
  const clickCellTest = useCallback(
    (date: string) => {
      // 데이터 조정은 여기서 수행
      // setGrassData();
      onClick(date);
      console.log(`클릭한 날짜 정보: ${date}`);
    },
    [onClick],
  );

  // 다음 슬라이드 클릭
  const clickNextSlide = () => {
    onClickNext();
    setYearMonthArr((prevArr) => {
      const slicedArr = prevArr.slice(1);
      if (prevArr[prevArr.length - 1].month + 1 <= 12) {
        return [
          ...slicedArr,
          {
            year: prevArr[prevArr.length - 1].year,
            month: 1 + prevArr[prevArr.length - 1].month,
            monthEng: format(
              new Date(prevArr[prevArr.length - 1].year, prevArr[prevArr.length - 1].month),
              'MMM',
            ) as monthYearData['monthEng'],
          },
        ];
      } else {
        return [
          ...slicedArr,
          {
            year: prevArr[prevArr.length - 1].year + 1,
            month: 1,
            monthEng: format(new Date(prevArr[prevArr.length - 1].year + 1, 0), 'MMM') as monthYearData['monthEng'],
          },
        ];
      }
    });
    // if (swiper?.isEnd) {
    //   appendGrassSlide();
    //   // !! setTimeout으로 했는데 이거 해결방법이 필요함.. 방법 I Don't No
    //   setTimeout(() => {
    //     swiper?.slideNext();
    //   }, 100);
    //   setTimeout(() => {
    //     setYearMonthArr((prev) => prev.slice(1));
    //   }, 300);
    // } else {
    //   swiper?.slideNext();
    // }
  };

  // 슬라이드 마지막에 이어붙이기
  const appendGrassSlide = useCallback(() => {
    setYearMonthArr((prevArr) => {
      if (prevArr[prevArr.length - 1].month + 1 <= 12) {
        return [
          ...prevArr,
          {
            year: prevArr[prevArr.length - 1].year,
            month: 1 + prevArr[prevArr.length - 1].month,
            monthEng: format(
              new Date(prevArr[prevArr.length - 1].year, prevArr[prevArr.length - 1].month),
              'MMM',
            ) as monthYearData['monthEng'],
          },
        ];
      } else {
        return [
          ...prevArr,
          {
            year: prevArr[prevArr.length - 1].year + 1,
            month: 1,
            monthEng: format(new Date(prevArr[prevArr.length - 1].year + 1, 0), 'MMM') as monthYearData['monthEng'],
          },
        ];
      }
    });
  }, [setYearMonthArr]);

  // 이전 슬라이드 클릭
  const clickPrevSlide = () => {
    onClickPrev();
    setYearMonthArr((prevArr) => {
      const slicedArr = prevArr.slice(0, prevArr.length - 1);
      if (prevArr[0].month - 1 < 1) {
        return [
          {
            year: prevArr[0].year - 1,
            month: 12,
            monthEng: format(new Date(prevArr[0].year, 11), 'MMM') as monthYearData['monthEng'],
          },
          ...slicedArr,
        ];
      } else {
        return [
          {
            year: prevArr[0].year,
            month: prevArr[0].month - 1,
            monthEng: format(new Date(prevArr[0].year, prevArr[0].month - 2), 'MMM') as monthYearData['monthEng'],
          },
          ...slicedArr,
        ];
      }
    });
    // if (swiper?.isBeginning) {
    //   prependGrassSlide();
    //   setTimeout(() => {
    //     swiper?.slidePrev();
    //     setYearMonthArr((prev) => prev.slice(0, prev.length - 1));
    //   }, 100);
    // } else {
    //   swiper?.slidePrev();
    // }
  };

  // 슬라이드 이전에 이어붙이기
  const prependGrassSlide = useCallback(() => {
    // 처음 값에만 추가
    setYearMonthArr((prevArr) => {
      if (prevArr[0].month - 1 < 1) {
        return [
          {
            year: prevArr[0].year - 1,
            month: 12,
            monthEng: format(new Date(prevArr[0].year, 11), 'MMM') as monthYearData['monthEng'],
          },
          ...prevArr,
        ];
      } else {
        return [
          {
            year: prevArr[0].year,
            month: prevArr[0].month - 1,
            monthEng: format(new Date(prevArr[0].year, prevArr[0].month - 2), 'MMM') as monthYearData['monthEng'],
          },
          ...prevArr,
        ];
      }
    });
    // 가상 index 활용이 필요함
    prependNumber.current = prependNumber.current - 1;
    swiper?.slideTo(swiper.activeIndex + 1, 0);
  }, [setYearMonthArr, swiper]);

  // 화면 사이즈 줄일때 스와이퍼 다시 update해줘야함
  useEffect(() => {
    swiper?.on('resize', () => {
      swiper.update();
    });
  }, [swiper]);

  return (
    <Styled.GrassAreaContainer>
      <div>
        <Typo.H1 color='#D2D2D2'>{title}</Typo.H1>
      </div>

      <Styled.GrassSwiper>
        <Swiper
          direction={'horizontal'}
          modules={[Navigation, Virtual]}
          spaceBetween={10}
          breakpoints={{
            // when window width is >= 0px
            0: {
              slidesPerView: 1,
            },
            // when window width is >= 1194px
            1193: {
              slidesPerView: 4,
            },
          }}
          // touchRatio={0} // 드래그 가능 여부
          onSwiper={(swiper) => setSwiper(swiper)}
          virtual={true}
        >
          {grassData?.map((grassItem, index) => {
            return (
              <SwiperSlide key={`slide-${index}`} virtualIndex={index}>
                <MonthGrass
                  index={index}
                  date={`${yearMonthArr[index]?.year} ${yearMonthArr[index]?.monthEng}`}
                  GrassData={grassItem.data}
                  onClickCell={clickCellTest}
                ></MonthGrass>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div>
          <Styled.GrassNavigationPrevButton onClick={clickPrevSlide}>
            <IconGrassArrow></IconGrassArrow>
          </Styled.GrassNavigationPrevButton>
          <Styled.GrassNavigationNextButton onClick={clickNextSlide}>
            <IconGrassArrow></IconGrassArrow>
          </Styled.GrassNavigationNextButton>
        </div>
      </Styled.GrassSwiper>
    </Styled.GrassAreaContainer>
  );
};
