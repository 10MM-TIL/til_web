import { devError } from '@/utils/system';
import instance from './instance';
import { ServerResponse } from '../types';

export const getMyDraftAPI = async () => {
  try {
    const res: ServerResponse<{ data: string; updatedAt: string }> = await instance.get(`/my/draft`);

    return res;
  } catch (e) {
    devError('getMyDraftAPI error ', e);
    throw e;
  }
};

export const putMyDraftSyncAPI = async ({ data }: { data: string }) => {
  try {
    const res: ServerResponse<{ isSuccess: boolean }> = await instance.put(`/my/draft/sync`, { data });

    return res;
  } catch (e) {
    devError('putMyDraftSyncAPI error ', e);
    throw e;
  }
};
