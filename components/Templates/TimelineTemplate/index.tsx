import { useRouter } from 'next/router';
import { MouseEventHandler } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDate } from '@/utils/utils';

import { FONT_COLOR } from '@/constants/color';

import { clickedGrassDate } from '@/stores/user';
import { LoginModalState } from '@/stores/modalStateStore';
import { AuthState } from '@/stores/authStateStore';

import { putEditTimeline, deleteTimeline } from 'apis/user';
import useToast from '@/hooks/useToast';
import { useMyAllTimeline } from '@/hooks/queries/timelineQuery';
import { useResize } from '@/hooks/useResize';

import * as Typo from '@/components/Atom/Typography';
import { TimeLine } from '@/components/Atom/TimeLine';
import Spinner from '@/components/Atom/Spinner';
import InfiniteScrollLayout from '@/components/Layout/InfiniteScroll';

import IconCheckBig from '@/assets/svgs/IconCheckBig';
import { IconTimeline } from '@/assets/svgs/IconTimeline';
import * as Styled from './style';

interface TimelineTemplateProps {
  path: string;
  changable: boolean;
}

const TimelineComponent = ({
  content,
  postIdentifier,
  changable,
}: {
  content: { date: string; title: string; desc: string; url: string };
  postIdentifier: string;
  changable: boolean;
}) => {
  const router = useRouter();
  const { pathname } = router;
  const { isLogin } = useRecoilValue(AuthState);
  const setIsLoginModalOpen = useSetRecoilState(LoginModalState);
  const { showToast } = useToast();
  const { title: originalTitle, desc: originalSummary, date: originalDate } = content;
  const queryClient = useQueryClient();

  const editTimeline = useMutation(putEditTimeline, {
    onSuccess: () => {},
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['TIMELINE_INFINITE'] }),
  });

  const removeTimeline = useMutation(deleteTimeline, {
    onSuccess: () => {
      showToast(
        <>
          <IconCheckBig />
          <Typo.H1 color={FONT_COLOR.WHITE}>삭제 완료!</Typo.H1>
        </>,
      );
      queryClient.invalidateQueries({ queryKey: ['TIMELINE_GRASS_DATA'] });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['TIMELINE_INFINITE'] }),
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
    if (window.confirm('선택한 회고글을 삭제하시겠습니까?')) {
      removeTimeline.mutate({ postIdentifier: postIdentifier });
    }
  };

  return (
    <Styled.TimeLineLayout>
      <div style={{ minWidth: '21px' }}>
        <IconTimeline />
      </div>
      <Styled.TimeLineCardContent>
        {pathname === '/' && !isLogin && (
          <Styled.TimeLineCardNotLogin
            onClick={(e) => {
              if (!isLogin) {
                e.currentTarget.blur();
                setIsLoginModalOpen({ isLoginModalOpen: true });
              }
            }}
          />
        )}
        <TimeLine
          content={{ ...content, date: formatDate(originalDate) }}
          onSaveAllContent={(newValue) => updateTimeline(newValue as any)}
          onDeleteContent={handleDeleteContent}
          changable={changable}
        />
      </Styled.TimeLineCardContent>
    </Styled.TimeLineLayout>
  );
};

const TimeLineHeader = ({
  timeLineSizeText,
  onClickDate,
}: {
  timeLineSizeText: string;
  onClickDate: MouseEventHandler;
}) => {
  const clickedDate = useRecoilValue(clickedGrassDate);
  return (
    <Styled.TimelineTitleArea>
      <Typo.H1 color={FONT_COLOR.WHITE} style={{ paddingBottom: '16px' }}>
        타임라인
      </Typo.H1>
      <Typo.Body
        color={FONT_COLOR.GRAY_2}
        onClick={onClickDate}
        style={clickedDate !== '' ? { cursor: 'pointer' } : {}}
      >
        {timeLineSizeText}
      </Typo.Body>
    </Styled.TimelineTitleArea>
  );
};

const IsNotLoginTimeLine = () => {
  return (
    <>
      {Array.from({ length: 3 }, (_, index) => index).map((value, idx) => {
        const content = {
          title: '나만의 회고 로그를 쌓아보세요',
          date: '2023.01.01',
          url: 'https://asdf.com',
          desc: '상단 회고 탭에서 회고 게시글의 링크를 입력해보세요',
        };

        return (
          <TimelineComponent
            key={idx + value + content.title.length * idx}
            content={content}
            postIdentifier={'' + content.title.length * idx}
            changable={false}
          />
        );
      })}
    </>
  );
};
const IsEmptyTimeLine = () => {
  return (
    <Styled.EmptyTimeLine>
      <Typo.H2 color={FONT_COLOR.GRAY_2}>작성된 회고 글이 없습니다.</Typo.H2>
    </Styled.EmptyTimeLine>
  );
};

const TimeLineList = ({ path }: { path: string }) => {
  const [clickedDate, setClickedDate] = useRecoilState(clickedGrassDate);
  const clickDay = new Date(clickedDate);
  const fromSeconds = Math.round(clickDay.valueOf() / 1000);
  const toSeconds = Math.round(clickDay.valueOf() / 1000) + 86400;
  const { isLogin } = useRecoilValue(AuthState);

  const device = useResize();
  const {
    data: postObject,
    fetchNextPage,
    isSuccess,
    isFetchingNextPage,
  } = useMyAllTimeline({ path, from: fromSeconds || undefined, to: toSeconds || undefined, isLogin: isLogin });

  const intersectCallback = (entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      if (postObject && postObject.pages[postObject.pages.length - 1].nextPageToken === null) return;
      fetchNextPage();
    }
  };

  const onClickMoreTimeLine = () => {
    fetchNextPage();
  };

  const onClickDate = () => {
    if (clickedDate !== '') {
      setClickedDate('');
    }
  };
  return (
    <>
      {isSuccess && (
        <>
          <TimeLineHeader
            onClickDate={onClickDate}
            timeLineSizeText={clickedDate !== '' ? `전체보기` : `${postObject ? postObject.pages[0].size : '0'}개`}
          ></TimeLineHeader>
          <InfiniteScrollLayout intersectCallback={intersectCallback} isObserve={device === 'desktop'}>
            {postObject.pages.map((postList) => {
              return postList.posts.length === 0 ? (
                <IsEmptyTimeLine></IsEmptyTimeLine>
              ) : (
                postList.posts.map((postItem) => {
                  const content = {
                    title: postItem.title,
                    date: postItem.createdAt,
                    url: postItem.url,
                    desc: postItem.summary,
                  };
                  return (
                    <TimelineComponent
                      key={postItem.identifier}
                      content={content}
                      postIdentifier={postItem.identifier}
                      changable={true}
                    />
                  );
                })
              );
            })}
          </InfiniteScrollLayout>
          {postObject.pages[postObject.pages.length - 1].size >= 5 &&
            postObject.pages[postObject.pages.length - 1].nextPageToken !== null && (
              <Styled.TimelineMobileMoreButton onClick={onClickMoreTimeLine}>
                <Typo.H2 color={FONT_COLOR.GRAY_2}>타임라인 더보기</Typo.H2>
              </Styled.TimelineMobileMoreButton>
            )}
        </>
      )}
      {isFetchingNextPage && (
        <Styled.SpinnerContainer>
          <Spinner size='35px'></Spinner>
        </Styled.SpinnerContainer>
      )}
    </>
  );
};

const TimelineTemplate = ({ path, changable }: TimelineTemplateProps) => {
  const router = useRouter();
  const { pathname } = router;
  const { isLogin } = useRecoilValue(AuthState);

  return (
    <Styled.TimelineContainer>
      {pathname === '/' ? <IsNotLoginTimeLine /> : <TimeLineList path={path} />}
    </Styled.TimelineContainer>
  );
};

export default TimelineTemplate;
