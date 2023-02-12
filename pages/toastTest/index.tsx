import type { NextPage } from 'next';
import { css } from '@emotion/react';

import { useState } from 'react';
import { Button } from '@/components/Button';
import ToastMessage from '@/components/ToastMessage';
import useToast from '@/hooks/useToast';
import * as Typo from '@/components/Typography';
import { FONT_COLOR } from '@/constants/color';

const CardTest: NextPage = () => {
  const { isOpen, text, showToast } = useToast();
  /** 여기에 API 저장 추가 되어야 함 */
  const handleClick = () => {
    showToast(
      <>
        <a>checkIcon</a>
        <Typo.H1 color={FONT_COLOR.WHITE}> 저장되었습니다</Typo.H1>
      </>,
    );
  };
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
        <div>
          <Button types='sm' onClick={handleClick}>
            test
          </Button>
          {isOpen && <ToastMessage>{text}</ToastMessage>}
        </div>
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
