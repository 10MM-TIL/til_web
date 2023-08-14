import { fetchAllPosts, fetchRecommandPosts } from '@/apis/cardview';
import { CategoryQueryKeys } from '@/components/Atom/Card/types';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useAllPosts = (categories: CategoryQueryKeys) => {
  return useInfiniteQuery(
    ['ALL_CATEGORY_CARD_INFINITE', categories],
    ({ pageParam = '' }) => fetchAllPosts(categories, pageParam),
    {
      keepPreviousData: true,
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

export const useRecommandPosts = (categories: string, enabled: boolean) => {
  return useQuery(['RECOMMAND_CARD', categories], () => fetchRecommandPosts(categories), {
    keepPreviousData: true,
    enabled,
  });
};
