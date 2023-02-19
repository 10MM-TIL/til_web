import type { NextPage } from 'next';

import * as Typo from '@/components/Typography';
import Toggle from '@/components/Toggle';
import { mq } from '@/styles/mediaQuery';
import { css } from '@emotion/react';
import ToastMessage from '@/components/ToastMessage';
import useToast from '@/hooks/useToast';
import { Button } from '@/components/Button';
import { FONT_COLOR } from '@/constants/color';

const Test: NextPage = () => {
  // !! Color관련 ThemeProvider 적용할건지 여부
  const { isOpen, text, showToast } = useToast();
  const handleClick = () => {
    // showToast ReactNode
    showToast(
      <>
        <a>SVG</a>
        <Typo.H1 color={FONT_COLOR.GRAY_1}> 저장되었습니다</Typo.H1>
      </>,
    );
  };
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
      <br />
      <Button types='md' onClick={handleClick}>
        toastOpen
      </Button>
      {isOpen && <ToastMessage isOpen={isOpen}>{text}</ToastMessage>}
    </div>
  );
};

export default Test;
