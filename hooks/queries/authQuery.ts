import { useMutation } from '@tanstack/react-query';
import { postAuthLoginAPI } from 'apis/auth';
import instance from 'apis/instance';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

export const useAuthLogin = () => {
  const router = useRouter();

  return useMutation(postAuthLoginAPI, {
    onSuccess: ({ data }) => {
      if (!data?.refreshToken) return;

      setCookie('refToken', data.refreshToken);

      if (!data?.accessToken) return;

      instance.defaults.headers['Authorization'] = `Bearer ${data.accessToken}`;
      setCookie('accToken', data.accessToken);

      router.push('/'); // TODO 로그인 후 같은 페이지 새로 고침 (다듬어야 하는지 체크)
    },
    onError: (e) => {
      // TODO 구글 로그인 실패 시 보여주는 오류 ?
      console.error(e);
    },
  });
};
