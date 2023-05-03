import { getCookie } from 'cookies-next';
import { useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { AuthState } from '@/stores/authStateStore';

const useAuth = () => {
  const setAuthState = useSetRecoilState(AuthState);

  const isSignIn = !!getCookie('accToken');

  useEffect(() => {
    if (isSignIn) {
      setAuthState({ isLogin: isSignIn });
    } else {
      const refToken = getCookie('refToken');
      if (refToken) {
        // TODO renew token API 호출
      }
    }
  }, [isSignIn, setAuthState]);
};

export default useAuth;
