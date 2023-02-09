import type { NextPage } from 'next';
import { css } from '@emotion/react';
import { ChangeEvent, useState, useCallback } from 'react';

import { FieldRemind } from '@/components/FieldRemind';

const FieldRemindTest: NextPage = () => {
  const [title, setTitle] = useState('');
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('제목:' + e.target.value);
    setTitle(e.target.value);
  };

  const [date, setDate] = useState<Date | null>(null);
  const onDateChanged = useCallback((date: Date | null) => {
    console.log('선택한 날짜' + date);
    setDate(date);
  }, []);

  const onClickCopy = useCallback(() => {
    // 아직 어떤 기능인지 확실치 않아 테스트용으로 작성
    window.alert('링크가 복사되었습니다!');
  }, []);

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
        <FieldRemind type='date' date={'2023 11'} desc={'12312312312'} onClickCopy={onClickCopy}></FieldRemind>
        <FieldRemind
          type='datepicker'
          title={title}
          onTitleChange={onTitleChange}
          date={date}
          onDateChange={onDateChanged}
          onClickCopy={onClickCopy}
        ></FieldRemind>
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

export default FieldRemindTest;
