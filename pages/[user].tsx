// [user].tsx
import type { GetServerSideProps, NextPage, NextPageContext } from 'next';
import { useState, useEffect, useCallback, use, useRef } from 'react';
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
import { getUserProfile, getUserBlog, getUserTimeline, getUserGrass, putEditTimeline, deleteTimeline } from 'apis/user';
import { dehydrate, QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyProfileResponse, getTimelineResponse } from '@/types/user';
import { IconFloat } from '@/assets/svgs/IconFloat';
import { formatDate } from '@/utils/utils';
import { useMyAllTimeline } from '@/hooks/queries/timelineQuery';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

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
    <Button size='md' backgroundColor={BACKGROUND_COLOR.FIELD_10} onClick={() => router.push('/setting')}>
      <Typo.Label1 color={FONT_COLOR.WHITE}>계정설정</Typo.Label1>
    </Button>
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

const TimelineComponent = ({
  content,
  postIdentifier,
}: {
  content: { date: string; title: string; desc: string; url: string };
  postIdentifier: string;
}) => {
  const { title: originalTitle, desc: originalSummary, date: originalDate } = content;
  const queryClient = useQueryClient();
  const editTimeline = useMutation(putEditTimeline, {
    onSuccess: () => {
      console.log('onSuccess');
    },
    onSettled: () => queryClient.invalidateQueries(['POST'], { refetchInactive: true }),
  });
  const removeTimeline = useMutation(deleteTimeline, {
    onSuccess: () => {
      console.log('onSuccess');
    },
    onSettled: () => queryClient.invalidateQueries(['POST'], { refetchInactive: true }),
  });
  const updateTimeline = (content: { title: string; desc: string; createdAt: number }) => {
    editTimeline.mutate({
      postIdentifier: postIdentifier,
      editedContent: {
        title: content.title,
        summary: content.desc,
        createdAt: Date.parse(originalDate) / 1000,
      },
    });
  };
  const handleDeleteContent = () => {
    removeTimeline.mutate({ postIdentifier: postIdentifier });
  };
  return (
    <div style={{ display: 'flex', gap: '15px', marginBottom: '-10px' }}>
      <IconTimeline />
      <div style={{ width: '100%', marginTop: '5px' }}>
        <TimeLine
          content={{ ...content, date: formatDate(originalDate) }}
          onSaveAllContent={(newValue) => updateTimeline(newValue)}
          onDeleteContent={handleDeleteContent}
        />
      </div>
    </div>
  );
};

const TimeLineArea = ({ path }: { path: string }) => {
  const bottomDiv = useRef(null);
  const [totalSize, setTotalSize] = useState(0);
  const { data: postObject, fetchNextPage, isSuccess } = useMyAllTimeline(path);

  useEffect(() => {
    if (isSuccess) {
      setTotalSize(postObject.pages[0]?.size);
    }
  }, [isSuccess, postObject]);

  const [observe, unobserve] = useIntersectionObserver((entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      if (postObject && postObject.pages[postObject.pages.length - 1]?.nextPageToken === 'null') return;
      fetchNextPage();
    }
  });

  useEffect(() => {
    const optionRef = bottomDiv.current;
    if (optionRef) observe(optionRef);
    return () => {
      if (optionRef) unobserve(optionRef);
    };
  }, [observe, unobserve]);

  return (
    <TimelineContainer>
      <TimelineTitleArea>
        <Typo.H1 color={FONT_COLOR.WHITE} style={{ paddingBottom: '16px' }}>
          타임라인
        </Typo.H1>
        <Typo.Body color={FONT_COLOR.GRAY_2}>{totalSize}개</Typo.Body>
      </TimelineTitleArea>
      {postObject?.pages?.map((pages) =>
        pages?.posts?.map((item) => {
          const content = {
            title: item.title,
            date: item.createdAt,
            url: item.url,
            desc: item.summary,
          };
          return <TimelineComponent key={item.identifier} content={content} postIdentifier={item.identifier} />;
        }),
      )}
      {/* {timelineData.map((item) => {
        const content = {
          title: item.title,
          date: formatDate(item.createdAt),
          url: item.url,
          desc: item.summary,
        };
        return <TimelineComponent key={item.identifier} content={content} postIdentifier={item.identifier} />;
      })} */}
      <div ref={bottomDiv} />
    </TimelineContainer>
  );
};

const Mypage: NextPage = ({ path }: any) => {
  const { data: userInfo } = useQuery(['PROFILE'], () => getUserProfile(path));
  const { data: blogObject } = useQuery(['BLOGS'], () => getUserBlog(path));
  // const { data: postObject } = useQuery(['POST'], () => getUserTimeline(path, ));
  const { data: grassObject } = useQuery(['GRASS'], () => getUserGrass(path, 0, 9999999999));
  const { blogs } = blogObject ?? [];

  // const { size: postCount, posts } = postObject ?? { size: 0, posts: [] };
  const { metas: grass } = grassObject ?? [];

  const [url, setUrl] = useState(require(`@/assets/images/default.png`) as string);
  const [picid, setPicId] = useState(0);

  useEffect(() => {
    if (picid > 0) setUrl(require(`@/assets/images/${picid}.png`) as string);
  }, [picid]);
  return (
    <MypageWrapper>
      <MypageContainer>
        <IntroContainer>
          <ProfileIcon imgUrl={url} onClick={() => {}} />
          <TextContainer>
            <NameCategory isMe={userInfo?.isAuthorized} name={userInfo?.name} category={userInfo?.categoryName} />
            <Introduction blogs={blogs} introduction={userInfo?.introduction} />
          </TextContainer>
        </IntroContainer>
        <GrassArea title={`${userInfo?.name}의 기록`} />
        <TimeLineArea path={path} />
      </MypageContainer>
      <Button size='float' svg={<IconFloat />} />
    </MypageWrapper>
  );
};

export default Mypage;

export const getServerSideProps: GetServerSideProps = async (context: NextPageContext) => {
  const { user: path } = context.query;

  return { props: { path } };
};

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
