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
      {/* <div
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
          position: absolute;
          height: 803px;
          top: 0;
          left: 0;
          right: 0;

          background: radial-gradient(104.36% 136.15% at 49.88% 4.82%, rgba(0, 78, 228, 0) 46.48%, #22ffa2 100%);
          opacity: 0.4;
          filter: blur(10px);
          transform: rotate(180deg);
        `}
      ></div>
      <div
        css={css`
          position: absolute;
          top: 72px;
          left: 0;
          right: 0;
          height: 555.74px;

          background: linear-gradient(180deg, #004ee4 -21.96%, rgba(194, 226, 68, 0) 107.42%);
          opacity: 0.8;
          filter: blur(61px);
        `}
      ></div>
      <div
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 384px;
          background-color: black;
          opacity: 0.3;
        `}
      ></div> */}

      <Typo.Title color={FONT_COLOR['WHITE']}>
        꾸준한 회고와 기록을 통해 <br /> 매일 성장하세요
      </Typo.Title>
    </div>
  );
};

export default HomePage;
