import { devLogger } from '@/utils/system';
import { getAuth, logout } from '@/utils/utils';
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { postAuthRefreshAPI } from './auth';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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
    // TODO status === 418일 때 renew token API 호출

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

    if (err?.response?.status === 418 && typeof window !== 'undefined') {
      const accessToken = getCookie('accToken');
      const refreshToken = getCookie('refToken');

      if (!accessToken || !refreshToken) {
        alert('로그인 토큰이 만료되었습니다. 재 로그인을 해주세요');

        logout();
        return;
      }

      try {
        const { config } = err;

        const res = await postAuthRefreshAPI();

        if (!res?.data?.accessToken) {
          logout(true);
          return;
        }

        const token = res.data.accessToken;
        setCookie('accToken', token);

        instance.defaults.headers['Authorization'] = `Bearer ${token}`;

        config.headers['Authorization'] = `Bearer ${token}`;
        const { data } = await axios(config);
        return data;
      } catch (err) {
        console.error(err);
        logout(true);
      }
    }

    const e = err?.response?.data ?? {};

    devLogger(
      `🔴 API RESPONSE ERROR : ${err?.config?.method ?? ''} ${err?.config?.url ?? ''} [${err?.response?.status}]`,
      e,
    );

    return Promise.reject(e);
  },
);

export default instance;
