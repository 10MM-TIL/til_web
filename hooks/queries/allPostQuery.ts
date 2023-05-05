import { fetchAllPosts } from '@/apis/cardview';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useAllPosts = (categories: string) => {
  return useInfiniteQuery(
    ['all_category_card_infinite'],
    ({ pageParam = '' }) => fetchAllPosts(categories, pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextPageToken === 'null' ? undefined : lastPage.nextPageToken;
      },
      retry: 0,
    },
  );
};
