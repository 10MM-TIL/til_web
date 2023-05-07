import { useState, useCallback, useEffect, ReactHTMLElement } from 'react';
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
import { FONT_COLOR } from '@/constants/color';
import { useCategories } from '@/hooks/queries/categoryQuery';

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
import { myBloglist, myMailAgreement, myNotification } from '@/stores/user';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyProfile, putMyProfile, getMyNotification, putMyNotification, putMyBlog } from 'apis/setting';
import { usePutMyProfile } from '@/hooks/queries/saveQuery';
import { getUserBlog } from '@/apis/user';

const CategoryLayout = ({
  selectedCategoryId,
  onClick,
}: {
  selectedCategoryId: string;
  onClick: (v: string) => {};
}) => {
  const { data: category } = useCategories();
  const categoryData = category?.data;

  return (
    <BoxLayout title='분야'>
      <RadioGroup data={categoryData?.categories ?? []} selectedId={selectedCategoryId} onClick={onClick} />
    </BoxLayout>
  );
};

const NoticeLayout = () => {
  const DATA = [
    { identifier: 'DAY', name: '매일' },
    { identifier: 'WEEK', name: '매주' },
    { identifier: 'MONTH', name: '매월' },
  ];
  const { enable, iteration } = useRecoilValue(myNotification);
  const setNotification = useSetRecoilState(myNotification);
  const [mailAgreement, setMailAgreement] = useRecoilState(myMailAgreement);

  const handleRadioClick = (value: 'DAY' | 'WEEK' | 'MONTH') => {
    setNotification({ iteration: value, enable });
  };
  const handleToggleClick = () => {
    setNotification({ enable: !enable, iteration });
  };

  const handleCheckboxClick = useCallback(() => {
    setMailAgreement(!mailAgreement);
  }, [mailAgreement, setMailAgreement]);

  return (
    <div>
      <BoxLayout title='알림 설정'>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Toggle isOn={enable} onIsOnToggle={handleToggleClick} />
          <div>
            <RadioGroup data={DATA} selectedId={iteration} onClick={handleRadioClick} />
          </div>
        </div>
      </BoxLayout>
      <div style={{ float: 'right', marginRight: '8px' }}>
        <div style={{ marginLeft: '68px' }}>
          <CheckboxLabel
            text='마케팅 활용 및 뉴스레터 수신 동의'
            checked={mailAgreement}
            onClick={handleCheckboxClick}
          />
        </div>
        <Typo.Label2 color={FONT_COLOR.GRAY_2}>브릭로그와 관련된 유용한 정보를 받아보실 수 있습니다</Typo.Label2>
      </div>
    </div>
  );
};

const BlogLinkLayout = () => {
  const [blogList, setBlogList] = useRecoilState(myBloglist);
  const handleDeleteBlog = (id: string) => {
    setBlogList(
      blogList.filter((blogItem) => {
        if (blogItem.identifier !== id) return true;
      }),
    );
  };
  const setBlog = (id: string, url: string) => {
    setBlogList(
      blogList.map((blogItem) => {
        if (blogItem.identifier === id) return { ...blogItem, url };
        else return { ...blogItem };
      }),
    );
  };
  // const getMaximumId = (list: Array<{ id: string; url: string }>) => {
  //   return list.reduce((min, p) => (Number(p.id) > Number(min) ? p.id : min), list[0].id);
  // };
  const handleAddBlog = () => {
    if (blogList.length < 6) {
      setBlogList([...blogList, { identifier: Math.random().toString(36).substring(2, 11), url: '' }]);
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
          {blogList.length > 0
            ? blogList
                .slice()
                .reverse()
                .map((blogItem) => {
                  return (
                    <CertifiedBlog
                      key={blogItem.identifier}
                      id={blogItem.identifier}
                      blogName={blogItem.url}
                      onDeleteBlog={handleDeleteBlog}
                      setBlogUrl={setBlog}
                    />
                  );
                })
            : null}
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

const SaveLayout = ({ onClick }: any) => {
  return (
    <SaveButtonContainer>
      <Button size='lg' onClick={onClick}>
        저장하기
      </Button>
    </SaveButtonContainer>
  );
};

const FooterLayout = () => {
  return (
    <FooterContainer>
      <span style={{ display: 'flex', gap: '42px' }}>
        <a
          href='https://www.plip.kr/pcc/c791921f-5dc3-4cb0-baac-55e48ee2e585/privacy-policy'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Typo.Body color={FONT_COLOR.GRAY_2}>개인정보처리방침</Typo.Body>
        </a>
        <a href='https://10miri.notion.site/a96b7e92cdee4bc2836a0012b8b610b7' target='_blank' rel='noopener noreferrer'>
          <Typo.Body color={FONT_COLOR.GRAY_2}>서비스 이용 약관</Typo.Body>
        </a>
        <Typo.Body color={FONT_COLOR.GRAY_2}>회원탈퇴</Typo.Body>
      </span>
      <Typo.Body color={FONT_COLOR.GRAY_2}>로그아웃</Typo.Body>
    </FooterContainer>
  );
};

const Setting: NextPage = () => {
  const [myInfo, setMyInfo] = useState({});
  const [noti, setNoti] = useRecoilState(myNotification);
  const setMyMailAgreement = useSetRecoilState(myMailAgreement);
  const [blogList, setBlogList] = useRecoilState(myBloglist);
  const [url, setUrl] = useState(require('@/assets/images/default.png') as string);
  const [id, setId] = useState(0);
  const { data: userProfile } = useQuery(['myProfile'], getMyProfile, {
    onSuccess: (data) => {
      setMyMailAgreement(data.isMailAgreement);
      setMyInfo(data);
    },
    onError: () => {
      alert('error');
    },
  });
  useQuery(['myBlogs'], () => getUserBlog(userProfile?.path), {
    enabled: !!userProfile,
    onSuccess: (data) => {
      console.log(data);
      setBlogList(data.blogs);
    },
  });
  useQuery(['myNoti'], getMyNotification, {
    onSuccess: (data) => {
      setNoti(data);
    },
  });

  useEffect(() => {
    console.log('myInfo', myInfo);
    console.log('noti', noti);
  }, [myInfo, noti]);
  const queryClient = useQueryClient();
  const saveProfile = useMutation(putMyProfile, {
    onSuccess: () => {
      // 요청이 성공한 경우
      console.log('onSuccess');
      queryClient.invalidateQueries(['putProfile']); // queryKey 유효성 제거
    },
    // onError: () => {
    //   alert('저장에 실패했습니다. 다시 시도해주세요');
    // },
  });
  const saveNoti = useMutation(putMyNotification, {
    onSuccess: () => {
      console.log('onSuccess');
      queryClient.invalidateQueries(['putNoti']);
    },
    // onError: () => {
    //   alert('저장에 실패했습니다. 다시 시도해주세요');
    // },
  });
  const saveBlog = useMutation(putMyBlog, {
    onSuccess: () => {
      console.log('onSuccess');
      queryClient.invalidateQueries(['putBlog']);
    },
    // onError: () => {
    //   alert('저장에 실패했습니다. 다시 시도해주세요');
    // },
  });

  const handleSave = () => {
    saveProfile.mutate(
      {
        categoryIdentifier: myInfo.categoryIdentifier,
        introduction: myInfo.introduction,
        name: myInfo.name,
        path: myInfo.path,
        profileImgSrc: 'https://raw.githubusercontent.com/Brick-log/til-server/main/default.png',
        mailAgreement: false,
      },
      {
        onSuccess: () => {
          // 요청이 성공한 경우
          console.log('onSuccess');
        },
        onError: (error) => {
          // 요청에 에러가 발생된 경우
          console.log('onError');
        },
        onSettled: () => {
          // 요청이 성공하든, 에러가 발생되든 실행하고 싶은 경우
          console.log('onSettled');
        },
      },
    ); // 데이터 저장
    saveNoti.mutate(noti);
    saveBlog.mutate(
      blogList.map((blog) => {
        return { url: blog.url };
      }),
    );
  };

  const handleChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMyInfo((prev) => {
      return { ...prev, name: e.target.value };
    });
  }, []);

  const handleChangePath = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMyInfo((prev) => {
      return { ...prev, path: e.target.value };
    });
  }, []);
  const handleChangeIntroduction = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMyInfo((prev) => {
      return { ...prev, introduction: e.target.value };
    });
  }, []);
  const handleChangeProfile = useCallback((newId: number) => {
    setId(newId);
  }, []);

  const handleChangeCategory = useCallback((value: string) => {
    setMyInfo((prev) => {
      return { ...prev, categoryIdentifier: value };
    });
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
              inputValue={myInfo.path}
              useCopy={true}
              onChange={handleChangePath}
            />
            <TextField title='이름' isInput={true} inputValue={myInfo.name} onChange={handleChangeName} />
            <TextField
              title={'소개'}
              isInput={false}
              inputValue={myInfo.introduction}
              onChange={handleChangeIntroduction}
            />
          </InputContainer>
        </ProfileContainer>
        <CheckContainer>
          <CategoryLayout selectedCategoryId={myInfo.categoryIdentifier} onClick={handleChangeCategory} />
          <NoticeLayout />
          <BlogLinkLayout />
          {/* <DownloadLayout /> */}
        </CheckContainer>
        <SaveLayout onClick={handleSave} />
        <FooterLayout />
      </EditpageContainer>
    </EditpageWrapper>
  );
};

export default Setting;
