import type { NextPage } from 'next';
import { css } from '@emotion/react';

import { Card } from '@/components/Card';
import { useState } from 'react';

const CardTest: NextPage = () => {
  const [testCardContent, setTestCardContent] = useState({
    category: 'develop' as 'develop',
    header: 'hackerrank - Nested Lists',
    body: 'Given the names and grades for each...',
    img: require('@/assets/images/test.png'),
    name: '김선철',
    date: '2023.01.07',
  });

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        justify-content: center;
        background-color: #252e38;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        `}
      >
        <Card size='sm' content={testCardContent}></Card>
        <Card size='lg' content={testCardContent}></Card>
        <Card size='lg' theme='light' content={testCardContent}></Card>
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
