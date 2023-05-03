import * as Typo from '@/components/Atom/Typography';
import { css } from '@emotion/react';
import { BACKGROUND_COLOR, FONT_COLOR } from '@/constants/color';
import { useResize } from '@/hooks/useResize';

import { useState } from 'react';
import LoginModal from '@/components/Molecules/LoginModal';

const HomePage = () => {
  const resize = useResize();

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        position: relative;
        padding-top: 38px;
      `}
    >
      <div
        css={css`
          position: absolute;
          width: 100%;
          height: 384px;
          left: 0;
          top: 0;
          background-image: url('/images/background.png');

          background-position: center;
        `}
      ></div>

      <div
        css={css`
          z-index: 2; // TODO Z-Index 관련 정리
          padding-top: 35px;
          text-align: center;
        `}
      >
        <Typo.Title color={FONT_COLOR['WHITE']}>
          꾸준한 회고와 기록을 통해 <br /> 매일 성장하세요
        </Typo.Title>
      </div>
    </div>
  );
};

export default HomePage;
