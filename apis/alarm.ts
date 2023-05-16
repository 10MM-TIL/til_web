import { devError } from '@/utils/system';
import { ServerResponse } from '../types';
import instance from './instance';

export const putMyNotificationAPI = async ({ enable, iteration }: { enable: boolean; iteration: string }) => {
  try {
    const res: ServerResponse<{ isSuccess: boolean }> = await instance.put('/my/notification', { enable, iteration });

    return res;
  } catch (e) {
    devError('putMyNotificationAPI error ', e);
    throw e;
  }
};
