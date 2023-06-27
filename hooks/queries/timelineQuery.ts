import { getUserTimeline } from '@/apis/user';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useMyAllTimeline = (path: string, from?: number, to?: number) => {
  return useInfiniteQuery(
    ['timelineInfinite', path],
    ({ pageParam = '' }) => getUserTimeline(path, pageParam, from, to),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage) {
          const { nextPageToken } = lastPage;
          return nextPageToken === 'null' ? undefined : nextPageToken;
        }
        return undefined;
      },
    },
  );
};

export const useTimelineByDate = (path: string, from: number, to: number) => {
  return useQuery(['timelineByDate'], ({ pageParam = '' }) => getUserTimeline(path, pageParam, from, to));
};
