import { getCookie, setCookie } from 'cookies-next';
import { useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { AuthState } from '@/stores/authStateStore';
import { postAuthRefreshAPI } from '@/apis/auth';
import { logout } from '@/utils/utils';
import instance from '@/apis/instance';

const useAuth = () => {
  const setAuthState = useSetRecoilState(AuthState);

  const isSignIn = !!getCookie('accToken');

  const handleRenewToken = useCallback(async () => {
    const res = await postAuthRefreshAPI();
    if (!res?.data?.accessToken || !res?.data?.refreshToken) {
      logout(true);
      return;
    }
    const token = res.data.accessToken;
    setCookie('accToken', token);
    setCookie('refToken', res.data.refreshToken);
    instance.defaults.headers['Authorization'] = `Bearer ${token}`;
  }, []);

  useEffect(() => {
    if (isSignIn) {
      setAuthState({ isLogin: isSignIn });
    } else {
      const refToken = getCookie('refToken');
      if (refToken) {
        handleRenewToken();
      }
    }
  }, [handleRenewToken, isSignIn, setAuthState]);
};

export default useAuth;
