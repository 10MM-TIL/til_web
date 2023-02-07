import type { NextPage } from 'next';
import { css } from '@emotion/react';
import { Grass } from '@/components/Grass';
import { useCalendar } from '@/hooks/useCalendarData';

const GrassTest: NextPage = () => {
  // 추후 잔디의 데이터를 받아오면 수정이 필요함
  const grassDataForJan = useCalendar(2023, 1, [
    new Date(2023, 0, 1).toString(),
    new Date(2023, 0, 3).toString(),
    new Date(2023, 0, 12).toString(),
    new Date(2023, 0, 13).toString(),
    new Date(2023, 0, 14).toString(),
    new Date(2023, 0, 15).toString(),
    new Date(2023, 0, 29).toString(),
  ]);

  const grassDataForFeb = useCalendar(2023, 2, [
    new Date(2023, 1, 1).toString(),
    new Date(2023, 1, 3).toString(),
    new Date(2023, 1, 12).toString(),
    new Date(2023, 3, 13).toString(),
    new Date(2023, 1, 14).toString(),
    new Date(2023, 1, 15).toString(),
    new Date(2023, 1, 29).toString(),
  ]);

  const grassDataForMar = useCalendar(2023, 3, [
    new Date(2023, 2, 1).toString(),
    new Date(2023, 2, 3).toString(),
    new Date(2023, 2, 12).toString(),
    new Date(2023, 2, 13).toString(),
    new Date(2023, 2, 14).toString(),
    new Date(2023, 2, 15).toString(),
    new Date(2023, 2, 29).toString(),
  ]);

  const grassDataForApr = useCalendar(2023, 4, [
    new Date(2023, 3, 1).toString(),
    new Date(2023, 3, 3).toString(),
    new Date(2023, 3, 12).toString(),
    new Date(2023, 3, 13).toString(),
    new Date(2023, 3, 14).toString(),
    new Date(2023, 3, 15).toString(),
    new Date(2023, 3, 29).toString(),
  ]);

  const clickCellTest = (date: string) => {
    // 데이터 조정은 여기서 수행
    // setGrassData();
    console.log(`클릭한 날짜 정보: ${date}`);
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        justify-content: center;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 200px;
        `}
      >
        <Grass date={'2023 Jan'} GrassData={grassDataForJan} onClickCell={clickCellTest} />
        <Grass date={'2023 Feb'} GrassData={grassDataForFeb} onClickCell={clickCellTest} />
        <Grass date={'2023 Mar'} GrassData={grassDataForMar} onClickCell={clickCellTest} />
        <Grass date={'2023 Apr'} GrassData={grassDataForApr} onClickCell={clickCellTest} />
      </div>
      <div
        css={css`
          display: flex;
          height: 500px;
          justify-content: center;
        `}
      ></div>
    </div>
  );
};

export default GrassTest;
