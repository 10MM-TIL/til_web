import type { NextPage } from 'next';

import * as Typo from '../components/Typography';
import { Dropdown } from '@/components/Dropdown';
import { useState } from 'react';
import { css } from '@emotion/react';

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
      <DropdownComponent></DropdownComponent>
    </div>
  );
};

const DropdownComponent = () => {
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
        align-items: center;
        justify-content: center;
      `}
    >
      <div
        css={css`
          max-width: 500px;
        `}
      >
        <Dropdown optionList={optionList} />
      </div>
    </div>
  );
};

export default Test;
