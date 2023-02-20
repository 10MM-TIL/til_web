import type { NextPage } from 'next';
import * as Typo from '@/components/Typography';
import Toggle from '@/components/Toggle';
import { css } from '@emotion/react';
import { ChangeEvent, useCallback, useState } from 'react';
import { TextField } from '@/components/TextField';
import { BACKGROUND_COLOR } from '@/constants/color';
import { FieldRemind } from '@/components/FieldRemind';
import { Card, CardProps } from '@/components/Card';
import { mq } from '@/styles/mediaQuery';

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
      <FieldRemindComponent></FieldRemindComponent>
      <div
        css={css`
          background-color: aqua;
          width: 300px;
          height: 300px;
          ${mq('desktop')} {
            background-color: orange;
          }
        `}
      >
        123
      </div>
      <CardComponent></CardComponent>
    </div>
  );
};

const CardComponent = () => {
  const [testCardContent, setTestCardContent] = useState<CardProps['content']>({
    category: 'develop',
    header: 'hackerrank - Nested Lists',
    body: 'Given the names and grades for each 123123123123123',
    img: require('@/assets/images/test.png') as string,
    name: '김선철',
    date: '2023.01.07',
  });

  const [badge, setBadge] = useState(true);
  const onClickTag = useCallback(
    (): CardProps['onClickTag'] => (e, tag) => {
      console.log(`${tag} 태그 클릭`);
    },
    [],
  );

  const onClickContent = useCallback(() => {
    () => {
      console.log('본문 클릭');
    };
  }, []);

  const onClickUser = useCallback(() => {
    () => {
      console.log('user 클릭');
    };
  }, []);
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 50px;
        background-color: ${BACKGROUND_COLOR.NAVY_1};
      `}
    >
      <h1
        css={css`
          color: white;
        `}
      >
        <strong>카드 컴포넌트</strong>
      </h1>
      <Card
        size='sm'
        content={testCardContent}
        hasBadge={true}
        onClickTag={onClickTag}
        onClickContent={onClickContent}
        onClickUser={onClickUser}
      ></Card>

      <Card
        size='lg'
        content={testCardContent}
        hasBadge={badge}
        onClickTag={onClickTag}
        onClickContent={onClickContent}
        onClickUser={onClickUser}
      ></Card>
      <button
        onClick={() => setBadge(!badge)}
        css={css`
          color: #fff;
        `}
      >
        뱃지 변환
      </button>
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
      </div>{' '}
    </div>
  );
};
export default Test;
