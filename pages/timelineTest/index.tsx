import type { NextPage } from 'next';
import { css } from '@emotion/react';

import { TimeLine, TimeLineProps, TimeLineContentProps } from '@/components/TimeLine';
import { useState } from 'react';

const Home: NextPage = () => {
  const [timelineContent, setTimelineContent] = useState<TimeLineContentProps>({
    date: '2023.01.07',
    body: 'TIL (커뮤니케이션 방법과 CEO)의 글자 길이 테스트123123123123123123123',
    img: require('../../assets/images/test.png'),
  });

  // 수정 삭제 드랍다운 데이터
  const EditList: TimeLineProps['editList'] = [
    {
      text: '수정',
      onClickHandler: () => {
        console.log('수정 클릭!');
      },
    },
    {
      text: '삭제',
      onClickHandler: () => {
        console.log('삭제 클릭!');
      },
    },
  ];

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
          margin-top: 50px;
        `}
      >
        {/* 서로다른 위치의 더보기 버튼 형태로 구현 */}
        <TimeLine editList={EditList} content={timelineContent} />
        <TimeLine
          editList={EditList}
          content={timelineContent}
          moreButtonPositionCss={{ top: '11px' }}
          editListPositionCss={{ right: '10px' }}
        />
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
