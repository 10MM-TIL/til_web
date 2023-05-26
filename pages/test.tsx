import type { NextPage } from 'next';
import { ChangeEvent, useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { BACKGROUND_COLOR } from '@/constants/color';

import * as Typo from '@/components/Atom/Typography';
import Toggle from '@/components/Atom/Toggle';
import { CertifiedBlog } from '@/components/Atom/CertifiedBlog';
import { GrassArea } from '@/components/Molecules/GrassArea';
import { TextField } from '@/components/Atom/TextField';
import { FieldRemind } from '@/components/Atom/FieldRemind';
import { Card, CardProps } from '@/components/Atom/Card';
import { Button } from '@/components/Atom/Button';
import { IconFloat } from '@/assets/svgs/IconFloat';
import { IconGoogle } from '@/assets/svgs/IconGoogle';
import { IconKakao } from '@/assets/svgs/IconKakao';
import { IconPlus } from '@/assets/svgs/IconPlus';
import { BoxLayout } from '@/components/Atom/BoxLayout';
import { TimeLine, TimeLineContentProps } from '@/components/Atom/TimeLine';
import { Dropdown } from '@/components/Atom/Dropdown';
import CheckboxLabel from '@/components/Molecules/CheckboxLabel';
import RadioGroup from '@/components/Molecules/RadioGroup';
import ProfileIcon from '@/components/Molecules/ProfileIcon';
import BlogGroup from '@/components/Molecules/BlogGroup';
import Modal from '@/components/Atom/Modal';
import AddBlog from '@/components/Atom/AddBlog';
import ToastMessage from '@/components/ToastMessage';
import useToast from '@/hooks/useToast';

const DATA = [
  {
    id: 1,
    text: '#개발',
  },
  {
    id: 2,
    text: '#디자인',
  },
  {
    id: 3,
    text: '#기획',
  },
  {
    id: 4,
    text: '#마케팅',
  },
  {
    id: 5,
    text: '#기업/스타트업',
  },
];

const BLOG_DATA = [
  {
    url: 'https://www.naver.com',
  },
  {
    url: 'https://www.tistory.com',
  },
  {
    url: 'https://velog.io',
  },
  {
    url: 'https://brunch.co.kr',
  },
  {
    url: 'https://www.daum.net',
  },
  {
    url: 'https://www.medium.com',
  },
];
const Test: NextPage = () => {
  return (
    <>
      <div
        css={css`
          background-color: ${BACKGROUND_COLOR.NAVY_1};
        `}
      >
        <h1>컴포넌트를 위한 테스트 페이지입니다.</h1>
        <ProfilComponent />
        <TypoComponent></TypoComponent>
        <ToggleComponent></ToggleComponent>
        <CertifiedBlogComponent></CertifiedBlogComponent>
        <GrassAreaComponent></GrassAreaComponent>
        <TextFieldComponent></TextFieldComponent>
        <FieldRemindComponent></FieldRemindComponent>
        <CardComponent></CardComponent>
        <ButtonComponent></ButtonComponent>
        <BoxLayoutTest></BoxLayoutTest>
        <TimeLineComponent></TimeLineComponent>
        <DropdownComponent></DropdownComponent>
        <CheckboxComponent />
        <BlogGroupComponent />
        <ModalComponent />
        <ToastComponent />
      </div>
    </>
  );
};

const ProfilComponent = () => {
  /**
   * 저장 버튼 누를 때 url 던져줘야하는데 image 주소 필요 HOW?
   */
  const [id, setId] = useState(0);
  const [url, setUrl] = useState(require('@/assets/images/default.png') as string);

  useEffect(() => {
    if (id > 0) setUrl(require(`@/assets/images/${id}.png`) as string);
  }, [id]);
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
      `}
    >
      <h1
        css={css`
          color: white;
          text-align: center;
          padding-top: 30px;
          margin-bottom: 30px;
        `}
      >
        <strong>프로필 아이콘</strong>
      </h1>
      <ProfileIcon
        imgUrl={url}
        editable={true}
        onClick={(id) => {
          setId(id);
        }}
      />
    </div>
  );
};

const RadioComponent = () => {
  const [selectedId, setSelectedId] = useState(1);

  const handleRadioClick = (value: number) => {
    setSelectedId(value);
  };

  // return <RadioGroup data={DATA} selectedId={selectedId} onClick={handleRadioClick} />;
};

const TypoComponent = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
      `}
    >
      <h1
        css={css`
          color: white;
          text-align: center;
          padding-top: 30px;
          margin-bottom: 30px;
        `}
      >
        <strong>Typography</strong>
      </h1>
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
    </div>
  );
};

const ToggleComponent = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        gap: 30px;
      `}
    >
      <h1
        css={css`
          color: white;
          text-align: center;
          padding-top: 30px;
        `}
      >
        <strong>Toggle 컴포넌트</strong>
      </h1>
    </div>
  );
};

const CertifiedBlogComponent = () => {
  const [blogList, setBlogList] = useState([
    {
      id: '1',
      url: 'github.exaple.com/example1',
    },
    {
      id: '2',
      url: 'github.exaple.com/example2',
    },
  ]);
  const handleDeleteBlog = (id: string) => {
    // 특정 조건 이후 없어져야함
    console.log('삭제 Post API 전송');
    setTimeout(() => {
      console.log('삭제 완료');
      setBlogList(
        blogList.filter((blogItem) => {
          if (blogItem.id !== id) return true;
        }),
      );
    }, 2000);
  };

  const setBlog = (id: string, url: string) => {
    setBlogList(
      blogList.map((blogItem) => {
        if (blogItem.id === id) return { ...blogItem, url };
        else return { ...blogItem };
      }),
    );
  };
  const getMaximumId = (list: Array<{ id: string; url: string }>) => {
    return list.reduce((min, p) => (Number(p.id) > Number(min) ? p.id : min), list[0].id);
  };
  const handleAddBlog = () => {
    if (blogList.length < 6) {
      const maxId = parseInt(getMaximumId(blogList)) + 1;
      setBlogList([...blogList, { id: String(maxId), url: '' }]);
    }
  };

  useEffect(() => {
    console.log('blogList', blogList);
  }, [blogList]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin-top: 10px;
        color: white;
        margin-bottom: 40px;
      `}
    >
      <h1>
        <strong>인증된 블로그 컴포넌트</strong>
      </h1>
      <AddBlog onClick={handleAddBlog} />
      {blogList.map((blogItem, index) => {
        return (
          <CertifiedBlog
            key={blogItem.id}
            id={blogItem.id}
            blogName={blogItem.url}
            onDeleteBlog={handleDeleteBlog}
            setBlogUrl={setBlog}
          />
        );
      })}
    </div>
  );
};

const GrassAreaComponent = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        gap: 30px;
      `}
    >
      <h1
        css={css`
          color: white;
          text-align: center;
          padding-top: 30px;
        `}
      >
        <strong>GrassArea 컴포넌트</strong>
      </h1>
      <GrassArea title={'내가 모은 기록'}></GrassArea>
    </div>
  );
};

const TextFieldComponent = () => {
  // !추후에 유효성 검사 필요 (특수문자 등등 ?)
  const [introduce, setIntroduce] = useState('');
  const [url, setUrl] = useState('ㅁㅁㅁㅁㅁㅁ');
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
          color: white;
          text-align: center;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            margin-top: 30px;
          `}
        >
          <h1>
            <strong>TextField 컴포넌트</strong>
          </h1>
          {/* <TextField title={'소개'} isInput={false} inputValue={introduce} onChange={onChangeIntroduce}></TextField> */}
          <TextField
            title={'URL 주소 설정'}
            isInput={true}
            useFixedString={true}
            inputValue={url}
            useCopy={true}
            onChange={onChangeUrl}
          ></TextField>
          {/* <TextField title={'이름'} isInput={true} inputValue={name} onChange={onChangeName}></TextField> */}
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
          color: white;
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

const CardComponent = () => {
  const [testCardContent, setTestCardContent] = useState<CardProps['content']>({
    category: '#개발',
    header: 'hackerrank - Nested Lists',
    body: 'Given the names and grades for each 123123123123123',
    img: require('@/assets/images/test.png') as string,
    name: '김선철',
    date: '2023.01.07',
  });

  const [badge, setBadge] = useState(true);

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
        onClickContent={onClickContent}
        onClickUser={onClickUser}
        userpath=''
        url=''
      ></Card>

      <Card
        size='lg'
        content={testCardContent}
        hasBadge={badge}
        onClickContent={onClickContent}
        onClickUser={onClickUser}
        userpath=''
        url=''
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

const ButtonComponent = () => {
  const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  `;

  const GoogleLoginButton = () => {
    return (
      <Button size='x-lg' backgroundColor='#FFFFFF' svg={<IconGoogle></IconGoogle>} gap={'16px'}>
        <Typo.H1>Google 로그인</Typo.H1>
      </Button>
    );
  };

  const KakaoLoginButton = () => {
    return (
      <Button size='x-lg' backgroundColor='#FDDC3F' svg={<IconKakao></IconKakao>} gap={'6px'}>
        <Typo.H1>카카오 로그인</Typo.H1>
      </Button>
    );
  };

  const Loginbutton = () => {
    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 6px;
        `}
      >
        <GoogleLoginButton></GoogleLoginButton>
        <KakaoLoginButton></KakaoLoginButton>
      </div>
    );
  };

  const GoogleLoginMButton = () => {
    return (
      <Button size='x-lg-m' backgroundColor='#FFFFFF' svg={<IconGoogle></IconGoogle>}>
        <Typo.H1>Google 로그인</Typo.H1>
      </Button>
    );
  };

  const KakaoLoginMButton = () => {
    return (
      <Button size='x-lg-m' backgroundColor='#FDDC3F' svg={<IconKakao></IconKakao>}>
        <Typo.H1>카카오 로그인</Typo.H1>
      </Button>
    );
  };

  const FloatingButton = () => {
    return <Button size='float' svg={<IconFloat></IconFloat>}></Button>;
  };

  const Loginbutton_M = () => {
    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 6px;
        `}
      >
        <GoogleLoginMButton></GoogleLoginMButton>
        <KakaoLoginMButton></KakaoLoginMButton>
      </div>
    );
  };
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: flex-start;
        background-color: #1b222c;
        padding: 50px;
        gap: 10px;
        color: white;
        margin-bottom: 50px;
      `}
    >
      <h1>
        <strong>Button 컴포넌트</strong>
      </h1>
      <Wrapper>
        <h3>Floating Button</h3>
        <FloatingButton></FloatingButton>
      </Wrapper>
      <Wrapper>
        <h3>Login Button_Large</h3>
        <Loginbutton></Loginbutton>
      </Wrapper>
      <Wrapper>
        <h3>Login Button_Medium_Mobile</h3>
        <Loginbutton_M></Loginbutton_M>
      </Wrapper>
    </div>
  );
};

const BoxLayoutTest = () => {
  const LinkComponent = () => {
    return (
      <BoxLayout title='새 탭에서 브릭로그 확인'>
        <Button size='md'>
          <Typo.Label1>크롬 확장앱 다운</Typo.Label1>
        </Button>
      </BoxLayout>
    );
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
        color: white;
      `}
    >
      <h1>
        <strong>box Layout 컴포넌트</strong>
      </h1>
      <LinkComponent />
    </div>
  );
};

const TimeLineComponent = () => {
  const [timelineContent, setTimelineContent] = useState<TimeLineContentProps>({
    date: '2023.01.07',
    title: 'TIL 커뮤니케이션 123123123123123123',
    desc: 'TIL (커뮤니케이션 방법과 CEO의 한마디디디디디디디',
    url: '',
  });

  const onSaveAllContent = useCallback((timeLineContentParams: TimeLineContentProps): Promise<void> => {
    // 저장하는 api 함수 추가
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setTimelineContent({ ...timeLineContentParams });
        resolve();
      }, 1000);
    });
  }, []);

  const onDeleteContent = useCallback((): Promise<void> => {
    // 삭제하는 api 함수 추가
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('삭제 완료!');
        resolve();
      }, 1000);
    });
  }, []);

  return (
    <div
      css={css`
        max-width: 1200px;
        padding: 30px;
      `}
    >
      <div
        css={css`
          max-width: 745px;
          min-width: 305px;
          margin: 0 auto;
          padding: 40px 0 40px 0;
        `}
      >
        <h1
          css={css`
            color: white;
            text-align: center;
            margin-bottom: 30px;
          `}
        >
          <strong>TimeLine 컴포넌트</strong>
        </h1>
        <div
          css={css`
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            gap: 10px;
          `}
        >
          <TimeLine content={timelineContent} onSaveAllContent={onSaveAllContent} onDeleteContent={onDeleteContent} />
        </div>
      </div>
    </div>
  );
};

const ToastComponent = () => {
  const { isOpen, showToast, text } = useToast();
  const handleClick = () => {
    showToast(
      <>
        <IconKakao />
        <Typo.H1 color='blue'>저장</Typo.H1>
      </>,
    );
  };

  return (
    <div
      css={css`
        max-width: 1200px;
        padding: 30px;
      `}
    >
      <div
        css={css`
          max-width: 745px;
          min-width: 305px;
          margin: 0 auto;
          padding: 40px 0 40px 0;
        `}
      >
        <h1
          css={css`
            color: white;
            text-align: center;
            margin-bottom: 30px;
          `}
        >
          <strong>ToastMessage 컴포넌트</strong>
        </h1>
        <div
          css={css`
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            gap: 10px;
          `}
        >
          <Button size='md' onClick={handleClick}>
            <Typo.Label1>toast message</Typo.Label1>
          </Button>
          {isOpen && <ToastMessage isOpen={isOpen}>{text}</ToastMessage>}
        </div>
      </div>
    </div>
  );
};

const ModalComponent = () => {
  const [open, setOpen] = useState(false);
  const handleClick = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        padding-bottom: 50px;
      `}
    >
      <h1>
        <strong>Modal 컴포넌트</strong>
      </h1>
      <div
        css={css`
          max-width: 500px;
        `}
      >
        {/* <Button onClick={handleClick}>열기</Button> */}
        <button style={{ background: 'white' }} onClick={handleClick}>
          열기
        </button>
        <Modal onClose={handleClose} closable={true} isOpen={open}>
          <div>TEST</div>
        </Modal>
      </div>
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
        color: white;
        padding-bottom: 50px;
      `}
    >
      <h1>
        <strong>Dropdown 컴포넌트</strong>
      </h1>
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

const CheckboxComponent = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        padding-bottom: 50px;
      `}
    >
      <h1>
        <strong>Checkbox 컴포넌트</strong>
      </h1>
      <div
        css={css`
          max-width: 500px;
        `}
      >
        <CheckboxLabel
          checked={checked}
          onClick={() => setChecked(!checked)}
          text='마케팅 활용 및 뉴스레터 수신 동의'
        />
        {/* <Dropdown optionList={optionList} /> */}
      </div>
    </div>
  );
};

const BlogGroupComponent = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        padding-bottom: 50px;
      `}
    >
      <h1>
        <strong>BlogGroup 컴포넌트</strong>
      </h1>
      <div
        css={css`
          max-width: 500px;
        `}
      >
        <BlogGroup data={BLOG_DATA} />
      </div>
    </div>
  );
};
export default Test;
