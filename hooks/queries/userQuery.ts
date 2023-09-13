import { useQuery } from '@tanstack/react-query';
import { getUserBlog } from '@/apis/user';

export const useGetBlogs = ({ path, enabled }: { path: string; enabled: boolean }) => {
  return useQuery(['BLOGS', path], () => getUserBlog(path), {
    enabled,
  });
};
