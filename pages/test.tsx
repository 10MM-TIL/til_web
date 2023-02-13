import type { NextPage } from 'next';
import { useCallback, useState } from 'react';
import * as Typo from '@/components/Typography';
import Toggle from '@/components/Toggle';
import { css } from '@emotion/react';
import { Card, CardProps } from '@/components/Card';
import { BACKGROUND_COLOR } from '@/constants/color';

const Test: NextPage = () => {
  // !! Color관련 ThemeProvider 적용할건지 여부

  const [testCardContent, setTestCardContent] = useState<CardProps['content']>({
    category: 'develop',
    header: 'hackerrank - Nested Lists',
    body: 'Given the names and grades for each 123123123123123',
    img: require('@/assets/images/test.png') as string,
    name: '김선철',
    date: '2023.01.07',
  });

  const [badge, setBadge] = useState(true);
  const onClickTag = useCallback(
    (): CardProps['onClickTag'] => (e, tag) => {
      console.log(`${tag} 태그 클릭`);
    },
    [],
  );

  const onClickContent = useCallback(() => {
    () => {
      console.log('본문 클릭');
    };
  }, []);

  const onClickUser = useCallback(() => {
    () => {
      console.log('user 클릭');
    };
  }, []);
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
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 50px;
          background-color: ${BACKGROUND_COLOR.NAVY_1};
        `}
      >
        <h1
          css={css`
            color: white;
          `}
        >
          <strong>카드 컴포넌트</strong>
        </h1>
        <Card
          size='sm'
          content={testCardContent}
          hasBadge={true}
          onClickTag={onClickTag}
          onClickContent={onClickContent}
          onClickUser={onClickUser}
        ></Card>

        <Card
          size='lg'
          content={testCardContent}
          hasBadge={badge}
          onClickTag={onClickTag}
          onClickContent={onClickContent}
          onClickUser={onClickUser}
        ></Card>
        <button
          onClick={() => setBadge(!badge)}
          css={css`
            color: #fff;
          `}
        >
          뱃지 변환
        </button>
      </div>
    </div>
  );
};

export default Test;
