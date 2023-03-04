import '../styles/globals.tsx';
import type { AppProps } from 'next/app';
import GlobalStyles from '@/styles/globals';

function MyApp({ Component, pageProps }: AppProps) {
  // TODO Recoil install 후 RecoilRoot로 감싸주기
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
