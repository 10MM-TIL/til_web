import type { NextPage } from 'next';
import { css } from '@emotion/react';

import { Dropdown } from '../../components/Dropdown';
import { useState } from 'react';

const Home: NextPage = () => {
  const [optionList, setOptionList] = useState([
    { id: 'develop', name: '🤐 개발' },
    { id: 'planning', name: '🤐 기획' },
    { id: 'design', name: '🤐 디자인' },
    { id: 'marketing', name: '🤐 마케팅' },
    { id: 'startup', name: '🤐 스타트업' },
    { id: 'etc', name: '🤐 기타' },
  ]);
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
        <Dropdown optionList={optionList} />
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

export default Home;
