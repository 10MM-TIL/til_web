import type { NextPage } from 'next';
import { css } from '@emotion/react';

import { Button } from '@/components/Button';

const ButtonTest: NextPage = () => {
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
        `}
      >
        <Button types='float'>메일</Button>
        <Button types='x-lg' backgroundColor={'#FDDC3F'}>
          로그인 버튼
        </Button>
        <Button types='lg'>큰 버튼</Button>
        <Button types='md'>중간 버튼</Button>
        <Button types='sm'>작은 버튼</Button>
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

export default ButtonTest;
