// [user].tsx
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import {
  MypageWrapper,
  MypageContainer,
  IntroContainer,
  TextContainer,
  InfoContainer,
  InfoLeftArea,
  InfoRightArea,
  IntroductionContainer,
  TimelineContainer,
  TimelineTitleArea,
} from '@/styles/mypage.module';
import ProfileIcon from '@/components/Molecules/ProfileIcon';
import { BACKGROUND_COLOR, FONT_COLOR, POINT_COLOR } from '@/constants/color';
import * as Typo from '@/components/Atom/Typography';
import { Button } from '@/components/Atom/Button';
import { GrassArea } from '@/components/Molecules/GrassArea';
import { TimeLine } from '@/components/Atom/TimeLine';
import { IconTimeline } from '@/assets/svgs/IconTimeline';
import BlogGroup from '@/components/Molecules/BlogGroup';
import router from 'next/router';
import { getMyProfile, getMyBlog, getMyTimeline, getMyGrass } from '@/pages/api/user';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { getMyProfileResponse } from '@/types/user';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInformation, myBloglist, myTimelineList } from '@/stores/user';

const NameCategory = ({ name }: { name: string }) => {
  const [isMe] = useState(true); // 추후 Recoil / reactQuery 로 변경하여 본인인지 여부 확인필요
  return (
    <InfoContainer>
      <InfoLeftArea>
        <Typo.H1 color={FONT_COLOR.WHITE}>{name}</Typo.H1>
        <Typo.Label2 color={POINT_COLOR.MAIN}>#개발자</Typo.Label2>
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
    <Button size='md' backgroundColor={BACKGROUND_COLOR.FIELD_10} onClick={() => router.push('/setting')}>
      <Typo.Label1 color={FONT_COLOR.WHITE}>계정설정</Typo.Label1>
    </Button>
  );
};

const Introduction = ({ introduction }: { introduction: string }) => {
  const blogs = useRecoilValue(myBloglist);

  return (
    <IntroductionContainer>
      <Typo.Body color={FONT_COLOR.WHITE}>{introduction}</Typo.Body>
      <BlogGroup data={blogs} />
    </IntroductionContainer>
  );
};

const TimelineComponent = () => {
  return (
    <div style={{ display: 'flex', gap: '15px', marginBottom: '-10px' }}>
      <IconTimeline />
      <div style={{ width: '100%', marginTop: '5px' }}>
        <TimeLine />
      </div>
    </div>
  );
};

const TimeLineArea = () => {
  return (
    <TimelineContainer>
      <TimelineTitleArea>
        <Typo.H1 color={FONT_COLOR.WHITE} style={{ paddingBottom: '16px' }}>
          타임라인
        </Typo.H1>
        <Typo.Body color={FONT_COLOR.GRAY_2}>개수</Typo.Body>
      </TimelineTitleArea>

      <TimelineComponent />
      <TimelineComponent />
      <TimelineComponent />
    </TimelineContainer>
  );
};

const Mypage: NextPage = () => {
  const router = useRouter();
  // console.log('router', router);
  const path = router.query.user as string;
  // console.log('path', path);
  const [user, setUser] = useRecoilState(userInformation);
  const [blogs, setBlogs] = useRecoilState(myBloglist);
  const [timeline, setTimeLine] = useRecoilState(myTimelineList);
  // const { data, status } = useQuery(['profile'], getMyProfile, { onSuccess: (data) => setUser(data) });
  useQuery(['blog'], () => getMyBlog(path), {
    onSuccess: (data) => setBlogs(data.blogs),
  });
  useQuery(['post'], () => getMyTimeline(data?.path, 10), {
    onSuccess: (data) => setTimeLine(data.postList),
  });

  const [url, setUrl] = useState('');
  const [id, setId] = useState(0);
  const handleChangeProfile = useCallback((newId: number) => {
    setId(newId);
  }, []);
  useEffect(() => {
    if (id > 0) setUrl(require(`@/assets/images/${id}.png`) as string);
  }, [id]);
  return (
    <MypageWrapper>
      <MypageContainer>
        <IntroContainer>
          <ProfileIcon
            imgUrl={url}
            onClick={(id) => {
              handleChangeProfile(id);
            }}
          />
          <TextContainer>
            <NameCategory name={user.name} />
            <Introduction introduction={user.introduction} />
          </TextContainer>
        </IntroContainer>
        <GrassArea title={`${user.name}의 기록`} />
        <TimeLineArea />
      </MypageContainer>
    </MypageWrapper>
  );
};

export default Mypage;

// export const getServerSideProps = async (context: any) => {
//   const path = router.query.user as string;
//   console.log('context,', context);
//   console.log('getserverside', path);
//   return { props: {} };
// };

// export const getStaticPaths = async () => {
//   return {
//     paths: [{ params: { user: 'duck' } }],
//     fallback: true,
//   };
// };

// export const getStaticProps = async (context: any) => {
//   const queryClient = new QueryClient();
//   console.log('context', context);
//   await queryClient.prefetchQuery(['profile'], getMyProfile);
//   await queryClient.prefetchQuery(['blog'], () => getMyBlog(context.params?.name));
//   await queryClient.prefetchQuery(['post'], () => getMyTimeline(context.params?.name, 10));
//   await queryClient.prefetchQuery(['grass'], () => getMyGrass(context.name, 1, 12));
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };
