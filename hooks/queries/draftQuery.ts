import { getMyDraftAPI, putMyDraftSyncAPI } from '@/apis/draft';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useMyDraft = ({ isLogin }: { isLogin: boolean }) => {
  return useQuery(['MY_DRAFT'], getMyDraftAPI, { enabled: isLogin });
};

export const useMyDraftSync = () => {
  return useMutation(putMyDraftSyncAPI);
};
