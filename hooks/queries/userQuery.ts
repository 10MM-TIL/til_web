import { useQuery } from '@tanstack/react-query';
import { getUserBlog, getUserProfile } from '@/apis/user';

export const useGetBlogs = (path: string) => {
  return useQuery(['BLOGS', path], () => getUserBlog(path));
};
