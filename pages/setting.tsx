import { useState, useCallback, useEffect } from 'react';
import type { NextPage } from 'next';
import {
  EditpageWrapper,
  EditpageContainer,
  ProfileContainer,
  InputContainer,
  PhotoContainer,
  CheckContainer,
  BlogLinkContainer,
  BlogTitleContainer,
  BlogLinkList,
  FooterContainer,
  SaveButtonContainer,
} from '@/styles/setting.module';
import { BACKGROUND_COLOR, FONT_COLOR, POINT_COLOR } from '@/constants/color';

import * as Typo from '@/components/Atom/Typography';
import { TextField } from '@/components/Atom/TextField';
import ProfileIcon from '@/components/Molecules/ProfileIcon';
import { BoxLayout } from '@/components/Atom/BoxLayout';
import { Button } from '@/components/Atom/Button';
import RadioGroup from '@/components/Molecules/RadioGroup';
import Toggle from '@/components/Toggle';
import CheckboxLabel from '@/components/Molecules/CheckboxLabel';
import AddBlog from '@/components/Atom/AddBlog';
import { CertifiedBlog } from '@/components/Atom/CertifiedBlog';
import { userInformation } from '@/stores/user';
import { useRecoilState, useRecoilValue } from 'recoil';

const CategoryLayout = () => {
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
  const [selectedId, setSelectedId] = useState(1);

  const handleRadioClick = (value: number) => {
    setSelectedId(value);
  };
  return (
    <BoxLayout title='분야'>
      <RadioGroup data={DATA} selectedId={selectedId} onClick={handleRadioClick} />
    </BoxLayout>
  );
};

const NoticeLayout = () => {
  const DATA = [
    { id: 1, text: '매일' },
    { id: 7, text: '매주' },
    { id: 30, text: '매월' },
  ];
  const [selectedId, setSelectedId] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  const handleRadioClick = (value: number) => {
    setSelectedId(value);
  };
  const handleCheckboxClick = useCallback(() => {
    setIsChecked(!isChecked);
  }, [isChecked]);

  return (
    <div>
      <BoxLayout title='알림 설정'>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Toggle />
          <div>
            <RadioGroup data={DATA} selectedId={selectedId} onClick={handleRadioClick} />
          </div>
        </div>
      </BoxLayout>
      <div style={{ float: 'right', marginRight: '8px' }}>
        <div style={{ marginLeft: '68px' }}>
          <CheckboxLabel text='마케팅 활용 및 뉴스레터 수신 동의' checked={isChecked} onClick={handleCheckboxClick} />
        </div>
        <Typo.Label2 color={FONT_COLOR.GRAY_2}>브릭로그와 관련된 유용한 정보를 받아보실 수 있습니다</Typo.Label2>
      </div>
    </div>
  );
};

const BlogLinkLayout = () => {
  const [blogList, setBlogList] = useState([
    {
      id: '1',
      url: 'naver.exaple.com/example1',
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
  return (
    <BlogLinkContainer>
      <BlogTitleContainer>
        <Typo.H1 color={FONT_COLOR.WHITE}>링크</Typo.H1>
        <AddBlog onClick={handleAddBlog} />
      </BlogTitleContainer>
      <div>
        <BlogLinkList>
          {blogList
            .slice()
            .reverse()
            .map((blogItem, index) => {
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
        </BlogLinkList>
      </div>
    </BlogLinkContainer>
  );
};

const DownloadLayout = () => {
  return (
    <BoxLayout title='새 탭에서 브릭로그 확인'>
      <Button size='md'>확장 앱 다운</Button>
    </BoxLayout>
  );
};

const SaveLayout = () => {
  return (
    <SaveButtonContainer>
      <Button size='lg'>저장하기</Button>
    </SaveButtonContainer>
  );
};

const FooterLayout = () => {
  return (
    <FooterContainer>
      <span style={{ display: 'flex', gap: '42px' }}>
        <Typo.Body color={FONT_COLOR.GRAY_2}>개인정보처리방침</Typo.Body>
        <Typo.Body color={FONT_COLOR.GRAY_2}>서비스 이용 약관</Typo.Body>
        <Typo.Body color={FONT_COLOR.GRAY_2}>회원탈퇴</Typo.Body>
      </span>
      <Typo.Body color={FONT_COLOR.GRAY_2}>로그아웃</Typo.Body>
    </FooterContainer>
  );
};

const Setting: NextPage = () => {
  const [url, setUrl] = useState(require('@/assets/images/default.png') as string);
  const [id, setId] = useState(0);
  const [user, setUser] = useRecoilState(userInformation);
  console.log('user', user);
  const handleChangeProfile = useCallback((newId: number) => {
    setId(newId);
  }, []);
  useEffect(() => {
    if (id > 0) setUrl(require(`@/assets/images/${id}.png`) as string);
  }, [id]);
  return (
    <EditpageWrapper>
      <EditpageContainer>
        <ProfileContainer>
          <PhotoContainer>
            <ProfileIcon
              editable={true}
              imgUrl={url}
              onClick={(id) => {
                handleChangeProfile(id);
              }}
            />
          </PhotoContainer>
          <InputContainer>
            <TextField
              title='URL 주소 설정'
              isInput={true}
              useFixedString={true}
              inputValue={user.path}
              useCopy={true}
              onChange={() => {}}
              // onChange={(e) => setUser(prev => }}
            />
            <TextField title='이름' isInput={true} inputValue={'이름테스트(상태로변경)'} onChange={() => {}} />
            <TextField title={'소개'} isInput={false} inputValue={'소개테스트'} onChange={() => {}} />
          </InputContainer>
        </ProfileContainer>
        <CheckContainer>
          <CategoryLayout />
          <NoticeLayout />
          <BlogLinkLayout />
          <DownloadLayout />
        </CheckContainer>
        <SaveLayout />
        <FooterLayout />
      </EditpageContainer>
    </EditpageWrapper>
  );
};

export default Setting;
