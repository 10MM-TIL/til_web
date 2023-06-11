// [user].tsx
import type { NextPage, NextPageContext } from 'next';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
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
  FloatingContainer,
} from '@/styles/mypage.module';
import ProfileIcon from '@/components/Molecules/ProfileIcon';
import { BACKGROUND_COLOR, FONT_COLOR, POINT_COLOR } from '@/constants/color';
import * as Typo from '@/components/Atom/Typography';
import { Button } from '@/components/Atom/Button';
import { GrassArea } from '@/components/Molecules/GrassArea';
import { TimeLine } from '@/components/Atom/TimeLine';
import { IconTimeline } from '@/assets/svgs/IconTimeline';
import BlogGroup from '@/components/Molecules/BlogGroup';
import router, { useRouter } from 'next/router';
import { getUserProfile, getUserBlog, getUserTimeline, getUserGrass, putEditTimeline, deleteTimeline } from 'apis/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyProfileResponse, getTimelineResponse } from '@/types/user';
import { IconFloat } from '@/assets/svgs/IconFloat';
import { formatDate } from '@/utils/utils';
import { useMyAllTimeline } from '@/hooks/queries/timelineQuery';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { clickedGrassDate } from '@/stores/user';
import IconRequest from '@/assets/svgs/IconRequest';
import { GrassStackedData } from '@/components/Molecules/GrassArea/types';
import Link from 'next/link';
import Custom404 from './404';
import Spinner from '@/components/Atom/Spinner';

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

const TimelineComponent = ({
  content,
  postIdentifier,
  changable,
}: {
  content: { date: string; title: string; desc: string; url: string };
  postIdentifier: string;
  changable: boolean;
}) => {
  const { title: originalTitle, desc: originalSummary, date: originalDate } = content;
  const queryClient = useQueryClient();
  const editTimeline = useMutation(putEditTimeline, {
    onSuccess: () => {
      console.log('onSuccess');
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['POST'] }),
  });
  const removeTimeline = useMutation(deleteTimeline, {
    onSuccess: () => {
      console.log('onSuccess');
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['POST'] }),
    // onSettled: () => queryClient.invalidateQueries(['POST'], { refetchInactive: true }),
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
          onSaveAllContent={(newValue) => updateTimeline(newValue as any)}
          onDeleteContent={handleDeleteContent}
          changable={changable}
        />
      </div>
    </div>
  );
};

const TimeLineArea = ({ path, changable }: { path: string; changable: boolean }) => {
  const bottomDiv = useRef(null);
  const [totalSize, setTotalSize] = useState(0);
  const { data: postObject, fetchNextPage, isSuccess } = useMyAllTimeline(path);
  const [clickedDate, setClickedDate] = useRecoilState(clickedGrassDate);
  const [timelineData, setTimelineData] = useState([]);

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

  useEffect(() => {
    const getTimeline = async () => {
      const res = await getUserTimeline(path, '', fromSeconds, toSeconds);
      setTimelineData(res?.posts);
    };
    const clickDay = new Date(clickedDate);
    const fromSeconds = Math.round(clickDay.valueOf() / 1000);
    const toSeconds = Math.round(clickDay.valueOf() / 1000) + 86400;
    // console.log('clickDay', Math.round(clickDay.valueOf() / 1000));
    console.log(clickDay);
    if (clickedDate !== '') getTimeline();
  }, [clickedDate, path]);

  return (
    <TimelineContainer>
      <TimelineTitleArea>
        <Typo.H1 color={FONT_COLOR.WHITE} style={{ paddingBottom: '16px' }}>
          타임라인
        </Typo.H1>
        <Typo.Body
          color={FONT_COLOR.GRAY_2}
          onClick={() => {
            if (clickedDate !== '') {
              setClickedDate('');
            }
          }}
          style={clickedDate !== '' ? { cursor: 'pointer' } : {}}
        >
          {clickedDate !== '' ? `전체보기` : `${totalSize}개`}
        </Typo.Body>
      </TimelineTitleArea>
      {clickedDate === ''
        ? postObject?.pages?.map((pages) =>
            pages?.posts?.map((item: any) => {
              const content = {
                title: item.title,
                date: item.createdAt,
                url: item.url,
                desc: item.summary,
              };
              return (
                <TimelineComponent
                  key={item.identifier}
                  content={content}
                  postIdentifier={item.identifier}
                  changable={changable}
                />
              );
            }),
          )
        : timelineData.map((item: any) => {
            const content = {
              title: item.title,
              date: item.createdAt,
              url: item.url,
              desc: item.summary,
            };
            return (
              <TimelineComponent
                key={item.identifier}
                content={content}
                postIdentifier={item.identifier}
                changable={changable}
              />
            );
          })}
      <div ref={bottomDiv} />
    </TimelineContainer>
  );
};

const GrassContainer = ({
  path,
  title,
  onClick,
}: {
  path: string;
  title: string;
  onClick: (value: string) => void;
}) => {
  const [base, setBase] = useState(0);
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth() + base, 1); // FROM 현재 날짜 기준 1일 (5월 1일)
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 5 + base, 1); // TO 현재 날짜 기준 +5달 (10월 1일)
  const fromSeconds = Math.round(firstDay.valueOf() / 1000);
  const toSeconds = Math.round(lastDay.valueOf() / 1000);

  const firstMonth = firstDay.getMonth() + 1;
  // console.log('firstDay.getMonth', firstMonth);
  // firstDay 달을 잡고
  // meta 로 받은 데이터를 map 돌면서 Date 처리 해서 같은 달인지 체크
  // 같은 달이면 [base+1] index에 Push
  //
  const { data: grassObject } = useQuery(['GRASS', path, fromSeconds, toSeconds], () =>
    getUserGrass(path, fromSeconds, toSeconds),
  );
  const dateList = grassObject?.metas || [];
  const stack: GrassStackedData = { '1': [], '2': [], '3': [], '4': [], '5': [] };
  dateList?.forEach((item: any) => {
    const temp = new Date(item);
    temp.setHours(0, 0, 0);
    // console.log(`firstMonth :${firstMonth} // temp.getMonth :${temp.getMonth() + 1}`);
    const index = String((temp.getMonth() + 1 - firstMonth + 1 + 12) % 12) as '1' | '2' | '3' | '4' | '5';

    stack[index].push(temp.toString());
  });
  const handleClickNext = () => {
    setBase((prev) => prev + 1);
  };
  const handleClickPrev = () => {
    setBase((prev) => prev - 1);
  };
  return (
    <GrassArea
      title={title}
      onClick={onClick}
      onClickNext={handleClickNext}
      onClickPrev={handleClickPrev}
      data={stack}
    />
  );
};

const User: NextPage = () => {
  const router = useRouter();
  const urlPath = (router.query?.user as string) || '';
  const { isReady, isFallback } = router;
  const path = urlPath.slice(1);

  const { data: userInfo } = useQuery(['PROFILE', path], () => getUserProfile(path), {
    enabled: !!isReady,
  });

  // useEffect(() => {
  //   console.log('userInfo', userInfo);
  //   console.log(`isReady : ${isReady}, isFallback : ${isFallback}`);
  // }, [isFallback, isReady]);

  const isError = useMemo(() => !userInfo || urlPath.at(0) !== '@', [urlPath, userInfo]);
  const onLoading = useMemo(() => isReady === false && isFallback === false, [isFallback, isReady]);
  // useEffect(() => {
  //   console.log('isError', isError);
  //   console.log('onLoading', onLoading);
  // }, [isError, onLoading]);

  const { data: blogObject } = useQuery(['BLOGS', path], () => getUserBlog(path));

  const { blogs } = blogObject ?? [];

  const setClickedDate = useSetRecoilState(clickedGrassDate);

  return isError ? (
    <Custom404 isReady={onLoading} />
  ) : (
    <MypageWrapper>
      <MypageContainer>
        <IntroContainer>
          <ProfileIcon imgUrl={userInfo?.profileImgSrc} />
          <TextContainer>
            <NameCategory isMe={userInfo?.isAuthorized} name={userInfo?.name} category={userInfo?.categoryName} />
            <Introduction blogs={blogs} introduction={userInfo?.introduction} />
          </TextContainer>
        </IntroContainer>
        <GrassContainer
          path={path}
          title={`${userInfo?.name}의 기록`}
          onClick={(value) => {
            setClickedDate(value);
          }}
        />
        <TimeLineArea path={path} changable={userInfo?.isAuthorized} />
      </MypageContainer>
      <FloatingContainer>
        <Button size='float' svg={<IconRequest />} onClick={() => window.open('https://tally.so/r/w5bNJd')} />
      </FloatingContainer>
    </MypageWrapper>
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
