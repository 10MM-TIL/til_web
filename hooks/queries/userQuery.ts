import { useQuery } from '@tanstack/react-query';
import { getUserBlog, getUserProfile } from '@/apis/user';

export const useGetUser = (path: string, isReady: boolean) => {
  return useQuery(['PROFILE', path], () => getUserProfile(path), {
    enabled: !!isReady,
    refetchOnMount: 'always',
  });
};

export const useGetBlogs = (path: string) => {
  return useQuery(['BLOGS', path], () => getUserBlog(path), {
    refetchOnMount: 'always',
  });
};
