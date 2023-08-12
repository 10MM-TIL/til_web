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
    ['TIMELINE_INFINITE', path],
    ({ pageParam = '' }) => getUserTimeline(path, pageParam, from, to),
    {
      enabled: isLogin && path.length > 0,
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
