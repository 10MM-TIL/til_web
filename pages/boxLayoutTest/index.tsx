import type { NextPage } from 'next';
import { css } from '@emotion/react';

import { BoxLayout } from '@/components/BoxLayout';
import { Button } from '@/components/Button';
import * as Typo from '@/components/Typography';

const ButtonTest: NextPage = () => {
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
        <LinkComponent />
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

// 예시) 컴포넌트 조합해서 쓰기
const LinkComponent = () => {
  return (
    <BoxLayout title='새 탭에서 브릭로그 확인'>
      <Button types='md'>
        <Typo.Label1>크롬 확장앱 다운로드</Typo.Label1>
      </Button>
    </BoxLayout>
  );
};

export default ButtonTest;
