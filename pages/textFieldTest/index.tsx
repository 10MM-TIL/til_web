import type { NextPage } from 'next';
import { css } from '@emotion/react';
import { ChangeEvent, useState } from 'react';

import { TextField } from '@/components/TextField';

const TextFieldTest: NextPage = () => {
  const [introduce, setIntroduce] = useState('');
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');

  const onChangeIntroduce = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduce(event.target.value);
  };
  const onChangeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };
  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        justify-content: center;
        background-color: #191f28;
        gap: 10px;
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
      ></div>
      <TextField title={'소개'} isInput={false} inputValue={introduce} onChange={onChangeIntroduce}></TextField>
      <TextField title={'URL 주소 설정'} isInput={true} inputValue={url} onChange={onChangeUrl}></TextField>
      <TextField title={'이름'} isInput={true} inputValue={name} onChange={onChangeName}></TextField>
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

export default TextFieldTest;
