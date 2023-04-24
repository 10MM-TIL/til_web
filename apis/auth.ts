import { PostResponse, SignInModel } from '../types';
import instance from './instance';

export const postAuthLoginAPI = async ({ token, type }: { token: string; type: string }) => {
  try {
    const res: PostResponse<SignInModel> = await instance.post('/auth/login', {
      token,
      type,
    });

    return res;
  } catch (e) {
    throw e;
  }
};
