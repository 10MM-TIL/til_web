import { devError } from '@/utils/system';
import { ServerResponse, SignInModel } from '../types';
import instance from './instance';
import { getCookie } from 'cookies-next';
import { logout } from '@/utils/utils';

export const postAuthLoginAPI = async ({ token, type, query }: { token: string; type: string; query: string }) => {
  try {
    console.log(query);
    const res: ServerResponse<SignInModel> = await instance.post('/auth/login', {
      token,
      type,
      redirectUrl: `${process.env.NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT_URI}`,
    });

    return res;
  } catch (e) {
    devError('postAuthLoginAPI error ', e);
    throw e;
  }
};

export const postAuthRefreshAPI = async () => {
  try {
    const accessToken = getCookie('accToken');
    const refreshToken = getCookie('refToken');

    if (!accessToken || !refreshToken) {
      alert('로그인 토큰이 만료되었습니다. 재 로그인을 해주세요');
      logout(true);
    }

    const res: ServerResponse<SignInModel> = await instance.post('/auth/refresh', {
      accessToken,
      refreshToken,
    });

    return res;
  } catch (e) {
    devError('postAuthLoginAPI error ', e);
    throw e;
  }
};
