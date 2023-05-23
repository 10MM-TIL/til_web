import { getMyDraftAPI, putMyDraftSyncAPI } from '@/apis/draft';
import { AuthState } from '@/stores/authStateStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

export const useMyDraft = () => {
  const { isLogin } = useRecoilValue(AuthState);
  return useQuery(['MY_DRAFT'], getMyDraftAPI, { enabled: isLogin });
};

export const useMyDraftSync = () => {
  return useMutation(putMyDraftSyncAPI);
};
