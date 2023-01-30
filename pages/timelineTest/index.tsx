import type { NextPage } from 'next';
import { css } from '@emotion/react';

import { TimeLine } from '@/components/TimeLine';
import { useState } from 'react';

const Home: NextPage = () => {
  const [timelineContent, setTimelineContent] = useState({
    date: '2023.01.07',
    body: 'TIL (커뮤니케이션 방법과 CEO)의 글자 길이 테스트123123123123123123123',
    img: require('../../assets/images/test.png'),
  });

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100%;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 10px;
        `}
      >
        <TimeLine size='sm' content={timelineContent} />
        <TimeLine size='lg' content={timelineContent} />
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

export default Home;
