import { useRef, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { clickedGrassDate } from '@/stores/user';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { getUserTimeline, putEditTimeline, deleteTimeline } from 'apis/user';
import { useMyAllTimeline } from '@/hooks/queries/timelineQuery';
import { TimelineContainer, TimelineTitleArea } from './style';
import * as Typo from '@/components/Atom/Typography';
import { TimeLine } from '@/components/Atom/TimeLine';
import { FONT_COLOR } from '@/constants/color';
import useToast from '@/hooks/useToast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import IconCheckBig from '@/assets/svgs/IconCheckBig';
import { IconTimeline } from '@/assets/svgs/IconTimeline';
import { formatDate } from '@/utils/utils';

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
  const { showToast } = useToast();
  const { title: originalTitle, desc: originalSummary, date: originalDate } = content;
  const queryClient = useQueryClient();
  const editTimeline = useMutation(putEditTimeline, {
    onSuccess: () => {
      console.log('onSuccess');
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['timelineInfinite'] }),
  });
  const removeTimeline = useMutation(deleteTimeline, {
    onSuccess: () => {
      console.log('onSuccess');
      showToast(
        <>
          <IconCheckBig />
          <Typo.H1 color={FONT_COLOR.WHITE}>삭제 완료!</Typo.H1>
        </>,
      );
      queryClient.invalidateQueries({ queryKey: ['GRASS'] });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['timelineInfinite'] }),
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
      <div style={{ width: '90%', marginTop: '5px' }}>
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

const TimelineTemplate = ({ path, changable }: TimelineTemplateProps) => {
  const bottomDiv = useRef(null);
  const [totalSize, setTotalSize] = useState(0);
  const { data: postObject, fetchNextPage, isSuccess, refetch } = useMyAllTimeline(path);
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
    refetch();
  }, [refetch]);

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

export default TimelineTemplate;
