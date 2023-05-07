import { getCookie } from 'cookies-next';
import { useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { AuthState } from '@/stores/authStateStore';
import { postAuthRefreshAPI } from '@/apis/auth';

const useAuth = () => {
  const setAuthState = useSetRecoilState(AuthState);

  const isSignIn = !!getCookie('accToken');

  useEffect(() => {
    if (isSignIn) {
      setAuthState({ isLogin: isSignIn });
    } else {
      const refToken = getCookie('refToken');
      if (refToken) {
        postAuthRefreshAPI();
      }
    }
  }, [isSignIn, setAuthState]);
};

export default useAuth;
