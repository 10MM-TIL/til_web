import { getUserTimeline } from '@/apis/user';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useMyAllTimeline = (path: string) => {
  return useInfiniteQuery(['timelineInfinite', path], ({ pageParam = '' }) => getUserTimeline(path, pageParam), {
    getNextPageParam: (lastPage) => {
      if (lastPage) {
        const { nextPageToken } = lastPage;
        return nextPageToken === 'null' ? undefined : nextPageToken;
      }
      return undefined;
    },
  });
};
