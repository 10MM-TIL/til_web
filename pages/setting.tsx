import { useState, useCallback, useEffect, MouseEventHandler } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';

import { getCookie } from 'cookies-next';

import { logout } from '@/utils/utils';

import { FONT_COLOR } from '@/constants/color';

import * as Styled from '@/styles/setting.module';
import { myBloglist, myInformation, myMailAgreement, myNotification, myOauthEmail } from '@/stores/user';
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
import CheckboxLabel from '@/components/Molecules/CheckboxLabel';
import AddBlog from '@/components/Atom/AddBlog';
import { CertifiedBlog } from '@/components/Atom/CertifiedBlog';
import ToastMessage from '@/components/ToastMessage';
import LoginModal from '@/components/Molecules/LoginModal';

import { CategoryQueryKeys } from '@/components/Atom/Card/types';

import IconCheckBig from '@/assets/svgs/IconCheckBig';
import { useGetMyBlog, useGetMyProfile, useSaveMyProfile } from '@/hooks/queries/settingQuery';

const CategoryLayout = ({
  selectedCategoryId,
  onClick,
}: {
  selectedCategoryId: string;
  onClick: (v: string) => void;
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
    <Styled.BlogLinkContainer>
      <Styled.BlogTitleContainer>
        <Typo.H1 color={FONT_COLOR.WHITE}>링크</Typo.H1>
        <AddBlog onClick={handleAddBlog} />
      </Styled.BlogTitleContainer>
      <div>
        <Styled.BlogLinkList>
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
        </Styled.BlogLinkList>
      </div>
    </Styled.BlogLinkContainer>
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
    <Styled.SaveButtonContainer>
      <Button size={device === 'desktop' ? 'lg' : 'x-lg-m'} onClick={onClick}>
        <Typo.H2>저장하기</Typo.H2>
      </Button>
    </Styled.SaveButtonContainer>
  );
};

const FooterLayout = () => {
  const myInfo = useRecoilValue(myInformation);
  const { email } = myInfo;
  const clickLogout = () => {
    logout(false);
    location.replace('/');
  };

  return (
    <Styled.FooterContainer>
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
    </Styled.FooterContainer>
  );
};

const Setting: NextPage = () => {
  const [myInfo, setMyInfo] = useRecoilState(myInformation);
  const blogList = useRecoilValue(myBloglist);
  const queryClient = useQueryClient();

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
  const { isSuccess: succGetMyProfile } = useGetMyProfile();
  useGetMyBlog(myInfo.path, succGetMyProfile);

  const saveProfile = useSaveMyProfile();

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
        profileImgSrc: myInfo.profileImgSrc,
        mailAgreement: myInfo.mailAgreement,
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
      await Promise.all(promises).then(async () => {
        queryClient.invalidateQueries({ queryKey: ['BLOGS'], refetchType: 'inactive' });
        queryClient.invalidateQueries({ queryKey: ['MY_PROFILE'], refetchType: 'inactive' });
        queryClient.invalidateQueries({ queryKey: ['PROFILE'], refetchType: 'inactive' });
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

  const handleChangeName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nameValue = e.target.value;
      setIsChangeInput(true);
      setMyInfo((prev) => {
        return { ...prev, name: nameValue };
      });
    },
    [setMyInfo],
  );

  const handleChangePath = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const pathValue = e.target.value;
      setIsChangeInput(true);
      setMyInfo((prev) => {
        return { ...prev, path: pathValue.replace(' ', '') };
      });
    },
    [setMyInfo],
  );
  const handleChangeIntroduction = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setIsChangeInput(true);
      setMyInfo((prev) => {
        return { ...prev, introduction: e.target.value };
      });
    },
    [setMyInfo],
  );
  const handleChangeProfile = useCallback((newId: number) => {
    setId(newId);
  }, []);

  const handleChangeCategory = useCallback(
    (value: string) => {
      setMyInfo((prev) => {
        return { ...prev, categoryIdentifier: value as CategoryQueryKeys };
      });
    },
    [setMyInfo],
  );
  useEffect(() => {
    if (id > 0)
      setMyInfo((prev) => {
        return { ...prev, profileImgSrc: `${websiteUrl}/images/profile/${id}.png` };
      });
  }, [id, setMyInfo, websiteUrl]);

  return (
    <>
      <Styled.EditpageWrapper>
        <Styled.EditpageContainer>
          <Styled.ProfileContainer>
            <Styled.PhotoContainer>
              <ProfileIcon
                editable={true}
                imgUrl={myInfo.profileImgSrc}
                onClick={(id) => {
                  handleChangeProfile(id);
                }}
              />
            </Styled.PhotoContainer>
            <Styled.InputContainer>
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
            </Styled.InputContainer>
          </Styled.ProfileContainer>
          <Styled.CheckContainer>
            <CategoryLayout selectedCategoryId={myInfo.categoryIdentifier} onClick={handleChangeCategory} />
            <NoticeLayout />
            <BlogLinkLayout />
            {/* <DownloadLayout /> */}
          </Styled.CheckContainer>
          <SaveLayout onClick={handleSave} />
          <FooterLayout />
        </Styled.EditpageContainer>
      </Styled.EditpageWrapper>
      {!isLogin && isLoginModalOpen && <LoginModal closable={false} />}
      {isOpen && <ToastMessage isOpen={isOpen}>{text}</ToastMessage>}
    </>
  );
};

export default Setting;
