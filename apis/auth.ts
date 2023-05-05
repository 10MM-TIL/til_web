import { devError } from '@/utils/system';
import { ServerResponse, SignInModel } from '../types';
import instance from './instance';

export const postAuthLoginAPI = async ({ token, type }: { token: string; type: string }) => {
  try {
    const res: ServerResponse<SignInModel> = await instance.post('/auth/login', {
      token,
      type,
    });

    return res;
  } catch (e) {
    devError('postAuthLoginAPI error ', e);
    throw e;
  }
};
