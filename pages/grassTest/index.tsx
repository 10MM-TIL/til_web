import type { NextPage } from 'next';
import { css } from '@emotion/react';

import { Grass, GrassData } from '@/components/Grass';
import { useState } from 'react';

const GrassTest: NextPage = () => {
  const [grassData, setGrassData] = useState<GrassData>([
    [
      { date: '', status: 'disabled' },
      { date: '', status: 'disabled' },
      { date: '0', status: 'unstack' },
      { date: '1', status: 'unstack' },
      { date: '2', status: 'unstack' },
      { date: '3', status: 'unstack' },
      { date: '4', status: 'unstack' },
    ],
    [
      { date: '5', status: 'unstack' },
      { date: '6', status: 'unstack' },
      { date: '7', status: 'unstack' },
      { date: '8', status: 'unstack' },
      { date: '9', status: 'unstack' },
      { date: '10', status: 'unstack' },
      { date: '11', status: 'unstack' },
    ],
    [
      { date: '12', status: 'stack' },
      { date: '13', status: 'stack' },
      { date: '14', status: 'stack' },
      { date: '15', status: 'stack' },
      { date: '16', status: 'stack' },
      { date: '17', status: 'stack' },
      { date: '18', status: 'stack' },
    ],
    [
      { date: '19', status: 'stack' },
      { date: '20', status: 'stack' },
      { date: '21', status: 'stack' },
      { date: '22', status: 'stack' },
      { date: '23', status: 'stack' },
      { date: '24', status: 'stack' },
      { date: '25', status: 'stack' },
    ],
    [
      { date: '26', status: 'stack' },
      { date: '27', status: 'stack' },
      { date: '28', status: 'stack' },
      { date: '', status: 'disabled' },
      { date: '', status: 'disabled' },
      { date: '', status: 'disabled' },
      { date: '', status: 'disabled' },
    ],
  ]);

  const clickCellTest = (date: string) => {
    // 데이터 조정은 여기서 수행
    // setGrassData();
    console.log(`cell 클릭/날짜: ${date}`);
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
        <Grass date={'2023 Jan'} GrassData={grassData} onClickCell={clickCellTest} />
        <Grass date={'2023 Jan'} GrassData={grassData} onClickCell={clickCellTest} />
        <Grass date={'2023 Jan'} GrassData={grassData} onClickCell={clickCellTest} />
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
