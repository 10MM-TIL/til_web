// [user].tsx
import type { NextPage, NextPageContext } from 'next';
import { useEffect } from 'react';
import {
  MypageWrapper,
  MypageContainer,
  IntroContainer,
  TextContainer,
  InfoContainer,
  InfoLeftArea,
  InfoRightArea,
  IntroductionContainer,
  FloatingContainer,
} from '@/styles/mypage.module';
import ProfileIcon from '@/components/Molecules/ProfileIcon';
import { BACKGROUND_COLOR, FONT_COLOR, POINT_COLOR } from '@/constants/color';
import * as Typo from '@/components/Atom/Typography';
import { Button } from '@/components/Atom/Button';
import BlogGroup from '@/components/Molecules/BlogGroup';
import { useRouter } from 'next/router';
import { getUserProfile, getUserBlog } from 'apis/user';
import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { clickedGrassDate } from '@/stores/user';
import IconRequest from '@/assets/svgs/IconRequest';
import Link from 'next/link';
import Custom404 from './404';
import Spinner from '@/components/Atom/Spinner';
import styles from '@/components/Molecules/OAuthLoading/OAuthLoading.styled';
import useToast from '@/hooks/useToast';
import ToastMessage from '@/components/ToastMessage';
import GrassTemplate from '@/components/Templates/GrassTemplate';
import TimelineTemplate from '@/components/Templates/TimelineTemplate';

const NameCategory = ({ isMe, name, category }: { isMe: boolean; name: string; category: string }) => {
  return (
    <InfoContainer>
      <InfoLeftArea>
        <Typo.H1 color={FONT_COLOR.WHITE}>{name}</Typo.H1>
        <Typo.Label2 color={POINT_COLOR.MAIN}>{category}</Typo.Label2>
      </InfoLeftArea>
      {isMe ? (
        <InfoRightArea>
          <SettingButton />
        </InfoRightArea>
      ) : null}
    </InfoContainer>
  );
};

const SettingButton = () => {
  return (
    <Link href='/setting'>
      <Button size='md' backgroundColor={BACKGROUND_COLOR.FIELD_10}>
        <Typo.Label1 color={FONT_COLOR.WHITE}>계정설정</Typo.Label1>
      </Button>
    </Link>
  );
};

const Introduction = ({ introduction, blogs }: { introduction: string; blogs: any[] }) => {
  return (
    <IntroductionContainer>
      <Typo.Body color={FONT_COLOR.WHITE}>{introduction}</Typo.Body>
      <BlogGroup data={blogs} />
    </IntroductionContainer>
  );
};

const Loading = () => {
  return (
    <div css={styles.loadingContainer}>
      <div css={styles.spinnerContainer}>
        <Spinner size='46px' />
        <Typo.Body color={FONT_COLOR.WHITE}>Loading ... </Typo.Body>
      </div>
    </div>
  );
};

const User: NextPage = () => {
  const router = useRouter();
  const urlPath = (router.query?.user as string) || '';
  const { isReady } = router;
  const path = urlPath.slice(1);
  const { isOpen, text } = useToast();

  const {
    data: userInfo,
    refetch: profileRefetch,
    isLoading,
    isSuccess,
  } = useQuery(['PROFILE', path], () => getUserProfile(path), {
    enabled: !!isReady,
  });

  const { data: blogObject, refetch: blogRefetch } = useQuery(['BLOGS', path], () => getUserBlog(path));

  const { blogs } = blogObject ?? [];

  const setClickedDate = useSetRecoilState(clickedGrassDate);

  useEffect(() => {
    blogRefetch();
    profileRefetch();
  }, [profileRefetch, blogRefetch]);

  return isLoading ? (
    <Loading />
  ) : !(!isSuccess || urlPath.at(0) !== '@') ? (
    <MypageWrapper>
      <MypageContainer>
        <IntroContainer>
          <ProfileIcon imgUrl={userInfo?.profileImgSrc} />
          <TextContainer>
            <NameCategory isMe={userInfo?.isAuthorized} name={userInfo?.name} category={userInfo?.categoryName} />
            <Introduction blogs={blogs} introduction={userInfo?.introduction} />
          </TextContainer>
        </IntroContainer>
        <GrassTemplate
          path={path}
          title={`${userInfo?.name}의 기록`}
          onClick={(value) => {
            setClickedDate(value);
          }}
        />

        <TimelineTemplate path={path} changable={userInfo?.isAuthorized} />
      </MypageContainer>
      <FloatingContainer>
        <Button size='float' svg={<IconRequest />} onClick={() => window.open('https://tally.so/r/w5bNJd')} />
      </FloatingContainer>
      {isOpen && <ToastMessage isOpen={isOpen}>{text}</ToastMessage>}
    </MypageWrapper>
  ) : (
    <Custom404 />
  );
};

export default User;

// export const getServerSideProps: any = async (context: NextPageContext) => {
//   const path = context.query?.user as string;
//   const apiPath = path.slice(1); // @ 떼고 api 콜
//   const data = await getUserProfile(apiPath); // getUserProfile API 를 통해 값 먼저 가져옴

//   if (!data || path.at(0) !== '@') {
//     return {
//       notFound: true, // 404 page 로 이동
//     };
//   }

//   return { props: { path: apiPath } };
// };

// export const getStaticPaths = async () => {
//   return {
//     paths: [{ params: { user: 'sjpark' } }],
//     // paths: [],
//     fallback: true,
//   };
// };

// export const getStaticProps = async (context: any) => {
//   const { params } = context;
//   const path = params.user;
//   console.log(params);
//   return {
//     props: { path: path },
//   };
// };
