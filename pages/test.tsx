import type { NextPage } from 'next';
import * as Typo from '@/components/Typography';
import Toggle from '@/components/Toggle';
import { css } from '@emotion/react';
import { BoxLayout } from '@/components/BoxLayout';
import { Button } from '@/components/Button';

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
      <BoxLayoutTest></BoxLayoutTest>
    </div>
  );
};

const BoxLayoutTest = () => {
  const LinkComponent = () => {
    return (
      <BoxLayout title='새 탭에서 브릭로그 확인'>
        <Button types='md'>
          <Typo.Label1>크롬 확장앱 다운</Typo.Label1>
        </Button>
      </BoxLayout>
    );
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
      `}
    >
      <h1>
        <strong>box Layout 컴포넌트</strong>
      </h1>
      <LinkComponent />
    </div>
  );
};

export default Test;
