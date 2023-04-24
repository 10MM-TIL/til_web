import { useQuery } from '@tanstack/react-query';
import { getMyUserAPI } from 'apis/profile';

export const useMyUser = ({ isLogin }: { isLogin?: boolean }) => {
  return useQuery(['MY_USER'], getMyUserAPI, {
    enabled: !!isLogin,
  });
};
