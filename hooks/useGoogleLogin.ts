import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

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

  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingToggle = (flag: boolean) => {
    setIsLoading(flag);
  };

  const handleGoogleLogin = useCallback(
    async (token: string) => {
      setIsLoading(true);

      const res: GoogleUserInfoModel = await axios.get(`/oauth2/v1/userinfo?access_token=${token}`);
      console.log(res);
      const { id: accountId, email, name, picture: profile, family_name, given_name } = res.data;

      if (!res?.data?.id) {
        router.push('/auth/signin');
      }
      const type = 'google';
    },
    [router],
  );

  useEffect(() => {
    const token = router?.asPath?.split('=')[1]?.split('&')[0];
    if (token) handleGoogleLogin(token);
    else router.isReady && router.push('/');
  }, [handleGoogleLogin, router, router?.asPath]);

  return { isLoading, onLoadingToggle: handleLoadingToggle };
};

export default useGoogleLogin;
