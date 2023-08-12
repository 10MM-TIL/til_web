import { getUserProfile } from '@/apis/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyUserAPI, postMyProfileOnboardingAPI } from 'apis/profile';

export const useMyUser = ({ isLogin }: { isLogin?: boolean }) => {
  return useQuery(['MY_USER'], getMyUserAPI, {
    enabled: isLogin,
  });
};

export const useMyProfileOnboarding = () => {
  const queryClient = useQueryClient();
  return useMutation(postMyProfileOnboardingAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(['MY_USER']);
    },
  });
};

export const useUserProfile = ({ isLogin, userPath }: { isLogin?: boolean; userPath: string }) => {
  return useQuery(['PROFILE', userPath], () => getUserProfile(userPath), {
    enabled: isLogin && userPath.length > 0,
  });
};
