import { getUserTimeline } from '@/apis/user';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useMyAllTimeline = ({
  path,
  from,
  to,
  isLogin = false,
}: {
  path: string;
  from?: number;
  to?: number;
  isLogin: boolean;
}) => {
  return useInfiniteQuery(
    ['timelineInfinite', path],
    ({ pageParam = '' }) => getUserTimeline(path, pageParam, from, to),
    {
      enabled: isLogin,
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
