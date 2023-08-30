import { fetchUserGrass, fetchUserTimeline } from '@/apis/user';
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
    ['TIMELINE_INFINITE', path, from, to, isLogin],
    ({ pageParam = '' }) => fetchUserTimeline(path, pageParam, from, to),
    {
      enabled: path.length > 0,
      keepPreviousData: true,
      getNextPageParam: (lastPage) => {
        if (lastPage) {
          const { nextPageToken } = lastPage;
          return nextPageToken === null ? undefined : nextPageToken;
        }
        return undefined;
      },
    },
  );
};

export const useFetchMyGrassData = ({
  path,
  from,
  to,
  isLogin = false,
}: {
  path: string;
  from: number;
  to: number;
  isLogin: boolean;
}) => {
  return useQuery(['TIMELINE_GRASS_DATA', { path, from, to }], () => fetchUserGrass({ path, from, to }), {
    enabled: path.length > 0,
    keepPreviousData: true,
  });
};
