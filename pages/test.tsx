import type { NextPage } from 'next';

import * as Typo from '@/components/Typography';
import Toggle from '@/components/Toggle';
import { css } from '@emotion/react';
import { ChangeEvent, useCallback, useState } from 'react';
import { TextField } from '@/components/TextField';
import { BACKGROUND_COLOR } from '@/constants/color';

const Test: NextPage = () => {
  // !! Color관련 ThemeProvider 적용할건지 여부
  return (
    <div
      css={css`
        max-width: 1180px;
        padding: 0 23px;
        margin: 0 auto;
        background-color: ${BACKGROUND_COLOR.NAVY_1};
      `}
    >
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
      <TextFieldComponent></TextFieldComponent>
    </div>
  );
};

const TextFieldComponent = () => {
  // !추후에 유효성 검사 필요 (특수문자 등등 ?)
  const [introduce, setIntroduce] = useState('');
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');

  const onChangeIntroduce = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduce(event.target.value);
  }, []);
  const onChangeUrl = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  }, []);
  const onChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  return (
    <div css={css``}>
      <div
        css={css`
          max-width: 483px;
          min-width: 328px;
          margin: 0 auto;
          padding: 40px 0 40px 0;
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
          <TextField title={'소개'} isInput={false} inputValue={introduce} onChange={onChangeIntroduce}></TextField>
          <TextField
            title={'URL 주소 설정'}
            isInput={true}
            useFixedString={true}
            inputValue={url}
            useCopy={true}
            onChange={onChangeUrl}
          ></TextField>
          <TextField title={'이름'} isInput={true} inputValue={name} onChange={onChangeName}></TextField>
        </div>
      </div>
    </div>
  );
};

export default Test;
