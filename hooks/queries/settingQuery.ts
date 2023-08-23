import { useSetRecoilState } from 'recoil';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { myInformation, myBloglist } from '@/stores/user';

import { getMyUserAPI } from '@/apis/profile';
import { getUserBlog } from '@/apis/user';
import { putMyProfile } from '@/apis/setting';

export const useGetMyProfile = () => {
  const setMyProfile = useSetRecoilState(myInformation);
  return useQuery(['MY_PROFILE'], getMyUserAPI, {
    onSuccess: (data) => setMyProfile(data),
  });
};

export const useGetMyBlog = (path: string, isSuccessGetMyProfile: boolean) => {
  const setMyBlogList = useSetRecoilState(myBloglist);
  return useQuery(['MY_BLOGS'], () => getUserBlog(path), {
    enabled: !!isSuccessGetMyProfile,
    onSuccess: (data) => setMyBlogList(data.blogs),
  });
};

export const useSaveMyProfile = () => {
  const queryClient = useQueryClient();
  return useMutation(putMyProfile, {
    onSuccess: () => queryClient.invalidateQueries(['MY_USER']), // queryKey 유효성 제거
  });
};
