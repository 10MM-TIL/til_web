import '../styles/globals.tsx';
import type { AppProps } from 'next/app';
import GlobalStyles from '@/styles/globals';
import KakaoScript from '@/components/common/KakaoScript';

declare global {
  interface Window {
    Kakao: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  // TODO Recoil install 후 RecoilRoot로 감싸주기
  return (
    <>
      <GlobalStyles />
      <KakaoScript />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
