import { useMutation, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import {
  getMyRetrospect,
  getRecommendRetrospectByCategory,
  getRetrospectByCategory,
  getRetrospectByPath,
  postMyRetrospect,
} from '@/apis/retrospect';

export const useMyRetrospect = () => {
  return useQuery(['MY_RETROSPECT'], getMyRetrospect);
};

export const usePostMyRetrospect = () => {
  return useMutation(postMyRetrospect);
};

export const useRetrospectByPath = ({
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
    ['RETROSPECT_BY_PATH'],
    ({ pageParam = '' }) => getRetrospectByPath(path, pageParam, from, to),
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
export const useRetrospectByCategory = (retrospectType: string) => {
  return useInfiniteQuery(['RETROSPECT_BY_CATEGORY'], ({ pageParam = '' }) => getRetrospectByCategory(retrospectType), {
    keepPreviousData: true,
    getNextPageParam: (lastPage) => {
      if (lastPage) {
        const { nextPageToken } = lastPage;
        return nextPageToken === null ? undefined : nextPageToken;
      }
      return undefined;
    },
  });
};

export const useRecommendRetrospect = (retrospectType: string, enabled: boolean) => {
  return useQuery(['RECOMMEND_RETROSPECT'], () => getRecommendRetrospectByCategory(retrospectType), {
    keepPreviousData: true,
    enabled,
  });
};
