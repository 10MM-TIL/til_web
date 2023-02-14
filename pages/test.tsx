import type { NextPage } from 'next';

import * as Typo from '@/components/Typography';
import Toggle from '@/components/Toggle';
import { css } from '@emotion/react';
import { Grass } from '@/components/Grass';
import { useCallback, useState } from 'react';
import { useCalendar } from '@/hooks/useCalendarData';

const Test: NextPage = () => {
  // !! Color관련 ThemeProvider 적용할건지 여부
  return (
    <div>
      <div>컴포넌트를 위한 테스트 페이지입니다.</div>
      <Typo.H1>Header 1</Typo.H1>
      <Typo.H1 color='#FF0000'>Header 1</Typo.H1>
      <Typo.H2>Header 2</Typo.H2>
      <Typo.H2 color='blue'>Header 2</Typo.H2>
      <Typo.SubHeader>Subheadline</Typo.SubHeader>
      <Typo.SubHeader color='orange'>Subheadline</Typo.SubHeader>
      <Typo.Body>Body</Typo.Body>
      <Typo.Body color='aqua'>Body</Typo.Body>
      <Typo.Label1>Label1</Typo.Label1>
      <br />
      <Typo.Label1 color='green'>Label1</Typo.Label1>
      <br />
      <Typo.Label1>Label2</Typo.Label1>
      <br />
      <Typo.Label1 color='violet'>Label2</Typo.Label1>
      <br />
      <Toggle />
      <GrassComponent></GrassComponent>
    </div>
  );
};

const GrassComponent = () => {
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

  const clickCellTest = useCallback((date: string) => {
    // 데이터 조정은 여기서 수행
    // setGrassData();
    console.log(`클릭한 날짜 정보: ${date}`);
  }, []);

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 200px;
      `}
    >
      <Grass date={'2023 Jan'} GrassData={grassDataForJan} onClickCell={clickCellTest} />
      {/* <Grass date={'2023 Feb'} GrassData={grassDataForFeb} onClickCell={clickCellTest} />
      <Grass date={'2023 Mar'} GrassData={grassDataForMar} onClickCell={clickCellTest} />
      <Grass date={'2023 Apr'} GrassData={grassDataForApr} onClickCell={clickCellTest} /> */}
    </div>
  );
};

export default Test;
