import type { NextPage } from 'next';
import { css } from '@emotion/react';

import { Card, CardProps } from '@/components/Card';
import { useCallback, useState } from 'react';

const CardTest: NextPage = () => {
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
    <div
      css={css`
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        justify-content: center;
        background-color: #191f28;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin-top: 100px;
        `}
      >
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
          변환
        </button>
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

export default CardTest;
