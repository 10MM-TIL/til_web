import { devLogger } from '@/utils/system';
import { getAuth, logout } from '@/utils/utils';
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    // 기존에 accept 헤더 커스텀해두신 것은 기본값으로 들어가고 있는 값이어서 제거해두었습니다.
    // accept: 'application/json',
  },
});

// 첫 접근 시, 토큰이 있을 때, instance header에 주입
const isAuth = getAuth();

if (isAuth?.accessToken) {
  instance.defaults.headers['Authorization'] = `Bearer ${isAuth.accessToken}`;
}

const apiStartTime = new Date().getTime();

instance.interceptors.request.use(
  (config) => {
    devLogger(`📡  API REQUEST : ${config?.method ?? ''} ${config?.url ?? ''}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    const apiEndTime = new Date().getTime();
    devLogger(
      `💡 API RESPONSE : ${response.config?.method ?? ''} ${response.config?.url ?? ''} [${
        response.status
      }] [${Math.ceil((apiEndTime - apiStartTime) / 100)}ms]`,
    );

    return response;
  },
  async (err) => {
    if (err?.code === 'ERR_NETWORK' && typeof window !== 'undefined') {
      // 서버에서 대응하지 못한 에러가 날때의 대응입니다.
      // 추후 해당 에러에 대한 UI를 구현해서 값을 sync해주면 될 것 같습니다.
      return Promise.reject({
        resultCode: -9999,
        data: 'Network Error',
      });
    }

    if (err?.response?.status >= 500 && typeof window !== 'undefined') {
      // 서버에서 대응하지 못한 에러가 날때의 대응입니다.
      // 추후 해당 에러에 대한 UI를 구현해서 값을 sync해주면 될 것 같습니다.
      if (err?.response?.data?.data) alert(err?.response?.data?.data);
      else alert('Server Error');
    }

    const { config, response } = err;

    // TODO access token 만료시 renew 후 재전송

    const e = err?.response?.data ?? {};

    devLogger(
      `🔴 API RESPONSE ERROR : ${err?.config?.method ?? ''} ${err?.config?.url ?? ''} [${err?.response?.status}]`,
      e,
    );

    return Promise.reject(e);
  },
);

export default instance;
