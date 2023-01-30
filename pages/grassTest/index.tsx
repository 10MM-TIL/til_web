import type { NextPage } from 'next';
import { css } from '@emotion/react';

import { Grass } from '@/components/Grass';
import { useState } from 'react';

const GrassTest: NextPage = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;

        width: 100%;
        height: 100%;
        justify-content: center;
      `}
    >
      <div
        css={css`
          display: flex;
          width: 200px;
          height: 500px;
          justify-content: center;
        `}
      ></div>
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <Grass />
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

export default GrassTest;
