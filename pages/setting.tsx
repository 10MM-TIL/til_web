import { useState, useCallback, useEffect, MouseEventHandler } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getCookie } from 'cookies-next';

import { logout } from '@/utils/utils';

import { FONT_COLOR } from '@/constants/color';

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
import { myBloglist, myMailAgreement, myNotification, myOauthEmail } from '@/stores/user';
import { LoginModalState } from '@/stores/modalStateStore';
import { AuthState } from '@/stores/authStateStore';

import { useCategories } from '@/hooks/queries/categoryQuery';
import { useResize } from '@/hooks/useResize';
import useAuth from '@/hooks/useAuth';
import useToast from '@/hooks/useToast';

import * as Typo from '@/components/Atom/Typography';
import { TextField } from '@/components/Atom/TextField';
import ProfileIcon from '@/components/Molecules/ProfileIcon';
import { BoxLayout } from '@/components/Atom/BoxLayout';
import { Button } from '@/components/Atom/Button';
import RadioGroup from '@/components/Molecules/RadioGroup';
import Toggle from '@/components/Atom/Toggle';
import CheckboxLabel from '@/components/Molecules/CheckboxLabel';
import AddBlog from '@/components/Atom/AddBlog';
import { CertifiedBlog } from '@/components/Atom/CertifiedBlog';
import ToastMessage from '@/components/ToastMessage';
import LoginModal from '@/components/Molecules/LoginModal';

import { MyUserModel } from '@/types/index';
import { CategoryQueryKeys } from '@/components/Atom/Card/types';

import { putMyProfile, getMyNotification, putMyNotification, putMyBlog } from '@/apis/setting';
import { getMyUserAPI } from '@/apis/profile';
import { getUserBlog } from '@/apis/user';

import IconCheckBig from '@/assets/svgs/IconCheckBig';

const CategoryLayout = ({
  selectedCategoryId,
  onClick,
}: {
  selectedCategoryId: string;
  onClick: (v: CategoryQueryKeys) => void;
}) => {
  const { data: categoryData } = useCategories();

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
                      placeholder='https://your-blog.com'
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

const SaveLayout = ({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) => {
  const device = useResize();
  return (
    <SaveButtonContainer>
      <Button size={device === 'desktop' ? 'lg' : 'x-lg-m'} onClick={onClick}>
        <Typo.H2>저장하기</Typo.H2>
      </Button>
    </SaveButtonContainer>
  );
};

const FooterLayout = () => {
  const email = useRecoilValue(myOauthEmail);
  const clickLogout = () => {
    logout(false);
    location.replace('/');
  };

  return (
    <FooterContainer>
      <span style={{ display: 'flex', gap: '34px' }}>
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
        <a href='https://tally.so/r/w5bNJd' target='_blank' rel='noopener noreferrer'>
          <Typo.Body color={FONT_COLOR.GRAY_2}>회원탈퇴</Typo.Body>
        </a>
      </span>
      <span style={{ display: 'flex', gap: '16px' }}>
        <Typo.Body color={FONT_COLOR.GRAY_1}>로그인 계정 {email}</Typo.Body>
        <a style={{ cursor: 'pointer' }} onClick={clickLogout}>
          <Typo.Body color={FONT_COLOR.GRAY_2}>로그아웃</Typo.Body>
        </a>
      </span>
    </FooterContainer>
  );
};

const Setting: NextPage = () => {
  const [myInfo, setMyInfo] = useState<MyUserModel>({
    categoryIdentifier: 'all',
    categoryName: '',
    email: '',
    introduction: '',
    mailAgreement: false,
    name: '',
    oauthType: '',
    path: '',
    profileImgSrc: '',
  });
  // const [noti, setNoti] = useRecoilState(myNotification);
  const [mailAgreement, setMyMailAgreement] = useRecoilState(myMailAgreement);
  const [blogList, setBlogList] = useRecoilState(myBloglist);
  const setOauthEmail = useSetRecoilState(myOauthEmail);
  const [imgUrl, setImgUrl] = useState('');
  useAuth();

  const { isLogin } = useRecoilValue(AuthState);
  const [isLoginModalOpen, setIsLoginModalOpen] = useRecoilState(LoginModalState);

  const websiteUrl = process.env.NEXT_PUBLIC_MODE === 'dev' ? 'https://dev.bricklog.io' : 'https://bricklog.io';

  const [id, setId] = useState(0);
  const [isChangeInput, setIsChangeInput] = useState(false);
  const accessToken = getCookie('accToken');
  const router = useRouter();

  const { isOpen, showToast, text } = useToast();

  useEffect(() => {
    if (!accessToken)
      setIsLoginModalOpen({
        isLoginModalOpen: true,
      });
  }, [accessToken, setIsLoginModalOpen]);

  const {
    data: userProfile = {
      categoryIdentifier: 'all',
      categoryName: '',
      introduction: '',
      mailAgreement: false,
      name: '',
      path: '',
      profileImgSrc: '',
      email: '',
      oauthType: '',
    },
    refetch,
  } = useQuery(['myProfile'], getMyUserAPI, {
    onSuccess: (data) => {
      setMyMailAgreement(data.mailAgreement);
      setMyInfo(data);
      setImgUrl(data?.profileImgSrc);
      setOauthEmail(data?.email);
    },
  });
  const { refetch: blogRefetch } = useQuery(['myBlogs'], () => getUserBlog(userProfile.path), {
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
      queryClient.invalidateQueries(['MY_USER']); // queryKey 유효성 제거
    },
  });

  const handleSave = async () => {
    const nameReg = /[^ㄱ-힣a-zA-Z0-9\s]/gi;
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
      saveProfile.mutateAsync({
        categoryIdentifier: myInfo.categoryIdentifier,
        introduction: myInfo.introduction,
        name: myInfo.name,
        path: myInfo.path,
        profileImgSrc: imgUrl,
        mailAgreement: mailAgreement,
        blogs: blogList
          .filter((item) => item?.url !== '')
          .map((blog) => {
            const { url } = blog;
            if (url.includes('https://') || url.includes('http://')) {
              return { url };
            } else return { url: `https://${url}` };
          }),
      }),
    ];
    try {
      await Promise.all(promises).then((res) => {
        router.push(`/@${myInfo.path}`);
        showToast(
          <>
            <IconCheckBig />
            <Typo.H1 color={FONT_COLOR.WHITE}>저장 완료!</Typo.H1>
          </>,
        );
      });
    } catch (error) {
      const customError = error as { description: string; errorCode: string };
      switch (customError?.errorCode) {
        case 'INVALID_ARGUMENT':
          alert('유효한 URL이 아닙니다. 입력한 링크 URL을 확인하세요.');
          break;
        case 'USER_MODIFY_FAIL':
          alert('중복된 URL 주소가 있습니다. 다른 URL 주소를 설정해주세요.');
          break;
        default:
          alert('저장에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    setIsChangeInput(true);
    setMyInfo((prev: MyUserModel) => {
      return { ...prev, name: nameValue };
    });
  }, []);

  const handleChangePath = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const pathValue = e.target.value;
    setIsChangeInput(true);
    setMyInfo((prev: MyUserModel) => {
      return { ...prev, path: pathValue.replace(' ', '') };
    });
  }, []);
  const handleChangeIntroduction = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsChangeInput(true);
    setMyInfo((prev: MyUserModel) => {
      return { ...prev, introduction: e.target.value };
    });
  }, []);
  const handleChangeProfile = useCallback((newId: number) => {
    setId(newId);
  }, []);

  const handleChangeCategory = useCallback((value: string) => {
    setMyInfo((prev: MyUserModel) => {
      return { ...prev, categoryIdentifier: value as CategoryQueryKeys };
    });
  }, []);
  useEffect(() => {
    if (id > 0) setImgUrl(`${websiteUrl}/images/profile/${id}.png`);
  }, [id, websiteUrl]);

  useEffect(() => {
    refetch();
    blogRefetch();
  }, [refetch, blogRefetch]);

  return (
    <>
      <EditpageWrapper>
        <EditpageContainer>
          <ProfileContainer>
            <PhotoContainer>
              <ProfileIcon
                editable={true}
                imgUrl={imgUrl}
                onClick={(id) => {
                  handleChangeProfile(id);
                }}
              />
            </PhotoContainer>
            <InputContainer>
              <TextField
                title='URL 주소'
                isInput={true}
                useFixedString={true}
                inputValue={myInfo.path}
                useCopy={true}
                maxLength={20}
                onChange={handleChangePath}
              />
              <TextField
                title='이름'
                isInput={true}
                inputValue={myInfo.name}
                maxLength={10}
                onChange={handleChangeName}
              />
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
      </EditpageWrapper>
      {!isLogin && isLoginModalOpen && <LoginModal closable={false} />}
      {isOpen && <ToastMessage isOpen={isOpen}>{text}</ToastMessage>}
    </>
  );
};

export default Setting;
