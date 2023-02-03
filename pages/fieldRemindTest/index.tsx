import type { NextPage } from 'next';
import { css } from '@emotion/react';

import { FieldRemind } from '@/components/FieldRemind';

const fieldRemind: NextPage = () => {
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
          margin-top: 50px;
        `}
      >
        <FieldRemind></FieldRemind>
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

export default fieldRemind;
