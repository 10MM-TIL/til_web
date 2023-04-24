import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useAuthLogin } from './queries/authQuery';

export interface GoogleUserInfoModel {
  data: {
    family_name: string;
    given_name: string;
    email: string;
    id: string;
    locale: string;
    name: string;
    picture: string;
  };
}

const useGoogleLogin = () => {
  const router = useRouter();
  const { mutateAsync } = useAuthLogin();

  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingToggle = (flag: boolean) => {
    setIsLoading(flag);
  };

  const handleGoogleLogin = useCallback(
    async (token: string) => {
      setIsLoading(true);

      await mutateAsync({ token, type: 'GOOGLE' });
    },
    [mutateAsync],
  );

  useEffect(() => {
    const token = router?.asPath?.split('=')[1]?.split('&')[0];
    if (token && router.isReady) handleGoogleLogin(token);
  }, [handleGoogleLogin, router?.asPath, router.isReady]);

  return { isLoading, onLoadingToggle: handleLoadingToggle };
};

export default useGoogleLogin;
