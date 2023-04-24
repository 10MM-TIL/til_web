import { devError } from '@/utils/system';
import { MyUserModel, ServerResponse } from '../types';
import instance from './instance';

export const getMyUserAPI = async () => {
  try {
    const res: ServerResponse<MyUserModel> = await instance.get('/my/user');

    return res;
  } catch (e) {
    devError('getMyUserAPI error ', e);
    throw e;
  }
};
