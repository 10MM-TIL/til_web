import { fetchAllPosts, fetchRecommandPosts } from '@/apis/cardview';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useAllPosts = (categories: string) => {
  return useInfiniteQuery(
    ['all_category_card_infinite', categories],
    ({ pageParam = '' }) => fetchAllPosts(categories, pageParam),
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

export const useRecommandPosts = (categories: string, enabled: boolean) => {
  return useQuery(['recommand_card', categories], () => fetchRecommandPosts(categories), { enabled });
};
