import type { NextPage } from 'next';

import * as Typo from '@/components/Typography';
import Toggle from '@/components/Toggle';
import { mq } from '@/styles/mediaQuery';
import { css } from '@emotion/react';
import { TimeLine, TimeLineContentProps } from '@/components/TimeLine';
import { useState, useCallback, useEffect } from 'react';

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

      <div
        css={css`
          background-color: aqua;
          width: 300px;
          height: 300px;
          ${mq('desktop')} {
            background-color: orange;
          }
        `}
      >
        123
      </div>
      <TimeLineComponent></TimeLineComponent>
    </div>
  );
};

const TimeLineComponent = () => {
  const [timelineContent, setTimelineContent] = useState<TimeLineContentProps>({
    date: '2023.01.07',
    title: 'TIL 커뮤니케이션 123123123123123123',
    desc: 'TIL (커뮤니케이션 방법과 CEO의 한마디디디디디디디',
    img: require('../assets/images/test.png'),
  });

  const onSaveAllContent = useCallback((timeLineContentParams: TimeLineContentProps): Promise<void> => {
    // 저장하는 api 함수 추가
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setTimelineContent({ ...timeLineContentParams });
        resolve();
      }, 1000);
    });
  }, []);

  useEffect(() => {
    console.log(timelineContent);
  }, [timelineContent]);

  const onDeleteContent = useCallback((): Promise<void> => {
    // 삭제하는 api 함수 추가
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('삭제 완료!');
        resolve();
      }, 1000);
    });
  }, []);
  return (
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
      <TimeLine content={timelineContent} onSaveAllContent={onSaveAllContent} onDeleteContent={onDeleteContent} />
    </div>
  );
};

export default Test;
