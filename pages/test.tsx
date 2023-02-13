import type { NextPage } from 'next';
import * as Typo from '@/components/Typography';
import Toggle from '@/components/Toggle';
import { css } from '@emotion/react';
import { ChangeEvent, useState, useCallback } from 'react';
import { FieldRemind } from '@/components/FieldRemind';

const Test: NextPage = () => {
  // !! Color관련 ThemeProvider 적용할건지 여부
  return (
    <div
      css={css`
        max-width: 1180px;
        padding: 0 23px;
        margin: 0 auto;
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
      <FieldRemindComponent></FieldRemindComponent>
    </div>
  );
};

const FieldRemindComponent = () => {
  const [title, setTitle] = useState('');
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('제목:' + e.target.value);
    setTitle(e.target.value);
  };

  const [desc, setDesc] = useState('');
  const onDescChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('내용:' + e.target.value);
    setDesc(e.target.value);
  };

  const [date, setDate] = useState<Date | null>(null);
  const onDateChange = useCallback((date: Date | null) => {
    console.log('선택한 날짜: ' + date);
    setDate(date);
  }, []);

  const onClickCopy = useCallback(() => {
    // 아직 어떤 기능인지 확실치 않아 테스트용으로 작성
    window.alert('링크가 복사되었습니다!');
  }, []);

  return (
    <div
      css={css`
        margin-top: 50px;
        max-width: 476px;
        min-width: 311px;
        margin: 0 auto;
      `}
    >
      <div
        css={css`
          width: 100%;
          display: flex;
          flex-wrap: nowrap;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        `}
      >
        <h1>
          <strong>FieldRemind 컴포넌트</strong>
        </h1>
        <FieldRemind
          type='date'
          date={'2023 11'}
          title={'asdasdasdasa'}
          desc={'12312312312'}
          onClickCopy={onClickCopy}
        ></FieldRemind>

        <FieldRemind
          type='datepicker'
          title={title}
          onTitleChange={onTitleChange}
          desc={desc}
          onDescChange={onDescChange}
          date={date}
          onDateChange={onDateChange}
          onClickCopy={onClickCopy}
        ></FieldRemind>
      </div>
    </div>
  );
};

export default Test;
