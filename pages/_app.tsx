import '../styles/globals.tsx';
import type { AppProps } from 'next/app';
import GlobalStyles from '@/styles/globals';
import { KakaoScript, Layout } from '@/components/common';

declare global {
  interface Window {
    Kakao: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  // TODO Recoil install 후 RecoilRoot로 감싸주기
  return (
    <>
      <KakaoScript />
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
