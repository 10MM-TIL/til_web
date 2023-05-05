import { fetchAllPosts, fetchRecommandPosts } from '@/apis/cardview';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useAllPosts = (categories: string) => {
  return useInfiniteQuery(
    ['all_category_card_infinite', categories],
    ({ pageParam = '' }) => fetchAllPosts(categories, pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { nextPageToken } = lastPage;
        return nextPageToken === 'null' ? undefined : nextPageToken;
      },
    },
  );
};

export const useRecommandPosts = (categories: string, enabled: boolean) =>
  useQuery({
    queryKey: ['recommand_card'],
    queryFn: () => fetchRecommandPosts(categories),
    enabled,
  });
