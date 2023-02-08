import type { NextPage } from 'next';
import { css } from '@emotion/react';

import { TimeLine, TimeLineContentProps } from '@/components/TimeLine';
import { useState, useCallback, useEffect } from 'react';

const Home: NextPage = () => {
  const [timelineContent, setTimelineContent] = useState<TimeLineContentProps>({
    date: '2023.01.07',
    title: 'TIL 커뮤니케이션 123123123123123123',
    desc: 'TIL (커뮤니케이션 방법과 CEO의 한마디디디디디디디',
    img: require('../../assets/images/test.png'),
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
        <TimeLine content={timelineContent} onSaveAllContent={onSaveAllContent} onDeleteContent={onDeleteContent} />
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
