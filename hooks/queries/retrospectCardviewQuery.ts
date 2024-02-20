import { fetchRecommendRetrospectCards, fetchRetrospectCards } from '@/apis/retrospectCardview';
import { CategoryQueryKeys } from '@/components/Atom/Card/types';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useRetrospects = (categories: CategoryQueryKeys) => {
  return useInfiniteQuery(
    ['RETROSPECT_CARD_INFINITE', categories],
    ({ pageParam = '' }) => fetchRetrospectCards(categories, pageParam),
    {
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

export const useRecommendRetrospects = (categories: string, enabled: boolean) => {
  return useQuery(['RECOMMEND_RETROSPECT_CARD', categories], () => fetchRecommendRetrospectCards(categories), {
    keepPreviousData: true,
    enabled,
  });
};
