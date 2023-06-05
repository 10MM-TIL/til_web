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
import { useResize } from '@/hooks/useResize';

import * as Typo from '@/components/Atom/Typography';
import { TextField } from '@/components/Atom/TextField';
import ProfileIcon from '@/components/Molecules/ProfileIcon';
import { BoxLayout } from '@/components/Atom/BoxLayout';
import { Button } from '@/components/Atom/Button';
import RadioGroup from '@/components/Molecules/RadioGroup';
import Toggle from '@/components/Atom/Toggle';
import CheckboxLabel from '@/components/Molecules/CheckboxLabel';
import AddBlog from '@/components/Atom/AddBlog';
import ToastMessage from '@/components/ToastMessage';

import { CertifiedBlog } from '@/components/Atom/CertifiedBlog';
import { myBloglist, myMailAgreement, myNotification } from '@/stores/user';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyProfile, putMyProfile, getMyNotification, putMyNotification, putMyBlog } from 'apis/setting';
import { usePutMyProfile } from '@/hooks/queries/saveQuery';
import { getUserBlog } from '@/apis/user';
import useToast from '@/hooks/useToast';
import IconCheckBig from '@/assets/svgs/IconCheckBig';
import { logout } from '@/utils/utils';
import { getCookie } from 'cookies-next';
import LoginModal from '@/components/Molecules/LoginModal';

const CategoryLayout = ({
  selectedCategoryId,
  onClick,
}: {
  selectedCategoryId: string;
  onClick: (v: string) => void;
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

  const handleRadioClick = (value: string) => {
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
      {/* <BoxLayout title='알림 설정'>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Toggle isOn={enable} onIsOnToggle={handleToggleClick} />
          <div>
            <RadioGroup data={DATA} selectedId={iteration} onClick={handleRadioClick} />
          </div>
        </div>
      </BoxLayout> */}
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
  const device = useResize();
  return (
    <SaveButtonContainer>
      <Button size={device === 'desktop' ? 'lg' : 'x-lg-m'} onClick={onClick}>
        저장하기
      </Button>
    </SaveButtonContainer>
  );
};

const FooterLayout = () => {
  const clickLogout = () => {
    logout(true);
  };

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
      <a style={{ cursor: 'pointer' }} onClick={clickLogout}>
        <Typo.Body color={FONT_COLOR.GRAY_2}>로그아웃</Typo.Body>
      </a>
    </FooterContainer>
  );
};

const Setting: NextPage = () => {
  const [myInfo, setMyInfo] = useState<any>({});
  // const [noti, setNoti] = useRecoilState(myNotification);
  const [mailAgreement, setMyMailAgreement] = useRecoilState(myMailAgreement);
  const [blogList, setBlogList] = useRecoilState(myBloglist);
  const [url, setUrl] = useState(require('@/assets/images/profile/default.png') as string);
  const [id, setId] = useState(0);
  const [isChangeInput, setIsChangeInput] = useState(false);
  const { isOpen, showToast, text } = useToast();
  const accessToken = getCookie('accToken');
  const { data: userProfile } = useQuery(['myProfile'], getMyProfile, {
    onSuccess: (data) => {
      setMyMailAgreement(data.mailAgreement);
      setMyInfo(data);
    },
  });
  useQuery(['myBlogs'], () => getUserBlog(userProfile?.path), {
    enabled: !!userProfile,
    onSuccess: (data) => {
      setBlogList(data.blogs);
    },
  });
  // useQuery(['myNoti'], getMyNotification, {
  //   onSuccess: (data) => {
  //     setNoti(data);
  //   },
  // });

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
  // const saveNoti = useMutation(putMyNotification, {
  //   onSuccess: () => {
  //     console.log('onSuccess');
  //     queryClient.invalidateQueries(['putNoti']);
  //   },
  //   // onError: () => {
  //   //   alert('저장에 실패했습니다. 다시 시도해주세요');
  //   // },
  // });
  // const saveBlog = useMutation(putMyBlog, {
  //   onSuccess: () => {
  //     console.log('onSuccess');
  //     queryClient.invalidateQueries(['putBlog']);
  //   },
  //   // onError: () => {
  //   //   alert('저장에 실패했습니다. 다시 시도해주세요');
  //   // },
  // });

  const handleSave = async () => {
    const nameReg = /[^ㄱ-힣a-zA-Z0-9]/gi;
    const pathReg = /[^a-zA-Z0-9-]/gi;
    const nameValue = myInfo.name;
    const pathValue = myInfo.path;
    if (nameReg.test(nameValue)) {
      alert('이름은 한글, 영어, 숫자로만 설정할 수 있어요.');
      return;
    }
    if (pathReg.test(pathValue)) {
      alert('URL 주소는 영어, 숫자, 하이픈(-)으로만 설정할 수 있어요.');
      return;
    }
    if (nameValue === '') {
      alert('이름을 입력해주세요.');
      return;
    }
    if (pathValue === '') {
      alert('URL 주소를 입력해주세요.');
      return;
    }

    const promises = [
      saveProfile.mutateAsync(
        {
          categoryIdentifier: myInfo.categoryIdentifier,
          introduction: myInfo.introduction,
          name: myInfo.name,
          path: myInfo.path,
          profileImgSrc: 'https://raw.githubusercontent.com/Brick-log/til-server/main/default.png',
          mailAgreement: mailAgreement,
          blogs: blogList.map((blog) => {
            const { url } = blog;
            if (url.includes('https://') || url.includes('http://')) {
              return { url };
            } else return { url: `https://${url}` };
          }),
        },
        {
          onError: () => {
            alert('중복된 URL 주소가 있습니다. 다른 URL 주소를 설정해주세요.');
          },
        },
      ),
    ];
    try {
      await Promise.all(promises).then((res) => {
        showToast(
          <>
            <IconCheckBig />
            <Typo.H1 color={FONT_COLOR.WHITE}>저장 완료!</Typo.H1>
          </>,
        );
      });
    } catch (error) {
      alert('저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    setIsChangeInput(true);
    setMyInfo((prev: any) => {
      return { ...prev, name: nameValue };
    });
  }, []);

  const handleChangePath = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const pathValue = e.target.value;
    setIsChangeInput(true);
    setMyInfo((prev: any) => {
      return { ...prev, path: pathValue };
    });
  }, []);
  const handleChangeIntroduction = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsChangeInput(true);
    setMyInfo((prev: any) => {
      return { ...prev, introduction: e.target.value };
    });
  }, []);
  const handleChangeProfile = useCallback((newId: number) => {
    setId(newId);
  }, []);

  const handleChangeCategory = useCallback((value: string) => {
    setMyInfo((prev: any) => {
      return { ...prev, categoryIdentifier: value };
    });
  }, []);
  useEffect(() => {
    if (id > 0) setUrl(require(`@/assets/images/profile/${id}.png`) as string);
  }, [id]);

  return (
    <>
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
                title='소개'
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
        {isOpen && <ToastMessage isOpen={isOpen}>{text}</ToastMessage>}
      </EditpageWrapper>
      {!accessToken && <LoginModal />}
    </>
  );
};

export default Setting;
