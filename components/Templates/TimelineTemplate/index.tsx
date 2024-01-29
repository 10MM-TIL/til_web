import { useRouter } from 'next/router';
import { MouseEventHandler } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDate } from '@/utils/utils';

import { FONT_COLOR } from '@/constants/color';

import { clickedGrassDate } from '@/stores/user';
import { LoginModalState } from '@/stores/modalStateStore';
import { AuthState } from '@/stores/authStateStore';

import useToast from '@/hooks/useToast';
import { useResize } from '@/hooks/useResize';

import * as Typo from '@/components/Atom/Typography';
import { TimeLine } from '@/components/Atom/TimeLine';
import Spinner from '@/components/Atom/Spinner';
import InfiniteScrollLayout from '@/components/Layout/InfiniteScroll';

import IconCheckBig from '@/assets/svgs/IconCheckBig';
import { IconTimeline } from '@/assets/svgs/IconTimeline';
import * as Styled from './style';
import { useRetrospectByPath } from '@/hooks/queries/retrospectQuery';
import { Retrospect, deleteRetrospect } from '@/apis/retrospect';
import TimelineIcon from '@/components/Atom/TimeLine/TimelineIcon';

interface TimelineTemplateProps {
  path: string;
  deletable: boolean;
}

const TimelineComponent = ({
  content,
  retrospectIdentifier,
  deletable,
}: {
  content: { date: string; title: string; qna: Retrospect };
  retrospectIdentifier: string;
  deletable: boolean;
}) => {
  const router = useRouter();
  const { pathname } = router;
  const { isLogin } = useRecoilValue(AuthState);
  const setIsLoginModalOpen = useSetRecoilState(LoginModalState);
  const { showToast } = useToast();
  const { title: originalTitle, date: originalDate } = content;
  const queryClient = useQueryClient();
  const device = useResize();

  const removeRetrospect = useMutation(deleteRetrospect, {
    onSuccess: () => {
      showToast(
        <>
          <IconCheckBig />
          <Typo.H1 color={FONT_COLOR.WHITE}>삭제 완료!</Typo.H1>
        </>,
        false,
      );
      queryClient.invalidateQueries({ queryKey: ['RETROSPECT_GRASS_DATA'] });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['RETROSPECT_BY_PATH'] }),
  });

  const handleDeleteContent = () => {
    if (window.confirm('선택한 회고글을 삭제하시겠습니까?')) {
      removeRetrospect.mutate({ retorspectIdentifier: retrospectIdentifier });
    }
  };

  return (
    <Styled.TimeLineLayout>
      {device === 'desktop' && <TimelineIcon />}
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
          onDeleteContent={handleDeleteContent}
          deletable={deletable}
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
        const content: { title: string; date: string; qna: Retrospect } = {
          title: '나만의 회고 로그를 쌓아보세요',
          date: '2023.01.01',
          qna: [
            {
              questionName: '질문1',
              answer: '대답1',
            },
            {
              questionName: '질문2',
              answer: '대답2',
            },
            {
              questionName: '질문3',
              answer: '대답3',
            },
          ],
        };

        return (
          <TimelineComponent
            key={idx + value + content.title.length * idx}
            content={content}
            retrospectIdentifier={'' + content.title.length * idx}
            deletable={false}
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

const TimeLineList = ({ path, deletable }: { path: string; deletable: boolean }) => {
  const [clickedDate, setClickedDate] = useRecoilState(clickedGrassDate);
  const clickDay = new Date(clickedDate);
  const fromSeconds = Math.round(clickDay.valueOf() / 1000);
  const toSeconds = Math.round(clickDay.valueOf() / 1000) + 86400;
  const { isLogin } = useRecoilValue(AuthState);

  const device = useResize();

  const {
    data: retrospectData,
    fetchNextPage,
    isSuccess,
    isFetchingNextPage,
  } = useRetrospectByPath({ path, from: fromSeconds || undefined, to: toSeconds || undefined, isLogin });

  const intersectCallback = (entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      if (retrospectData && retrospectData.pages[retrospectData.pages.length - 1].nextPageToken === null) return;
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
            timeLineSizeText={
              clickedDate !== '' ? `전체보기` : `${retrospectData ? retrospectData.pages[0].size : '0'}개`
            }
          ></TimeLineHeader>
          <InfiniteScrollLayout intersectCallback={intersectCallback} isObserve={device === 'desktop'}>
            {retrospectData.pages.map((retro) => {
              return retro.retrospects.length === 0 ? (
                <IsEmptyTimeLine />
              ) : (
                retro.retrospects.map((retroItem) => {
                  const { qna, createdAt, categoryIdentifier, retrospectIdentifier, questionTypeName } = retroItem;
                  const content = {
                    title: questionTypeName,
                    date: createdAt,
                    qna,
                  };
                  return (
                    <TimelineComponent
                      key={retrospectIdentifier}
                      content={content}
                      retrospectIdentifier={retrospectIdentifier}
                      deletable={deletable}
                    />
                  );
                })
              );
            })}
          </InfiniteScrollLayout>
          {retrospectData.pages[retrospectData.pages.length - 1].size >= 5 &&
            retrospectData.pages[retrospectData.pages.length - 1].nextPageToken !== null && (
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

const TimelineTemplate = ({ path, deletable }: TimelineTemplateProps) => {
  const router = useRouter();
  const { pathname } = router;
  const { isLogin } = useRecoilValue(AuthState);

  return (
    <Styled.TimelineContainer>
      {pathname === '/' && !isLogin ? <IsNotLoginTimeLine /> : <TimeLineList path={path} deletable={deletable} />}
    </Styled.TimelineContainer>
  );
};

export default TimelineTemplate;
