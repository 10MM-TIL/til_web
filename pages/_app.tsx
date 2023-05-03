import { useEffect, useState } from 'react';
import '../styles/globals.tsx';
import type { AppProps } from 'next/app';
import GlobalStyles from '@/styles/globals';
import { KakaoScript, Layout } from '@/components/common';
import { RecoilEnv, RecoilRoot } from 'recoil';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';

declare global {
  interface Window {
    Kakao: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  // TODO Recoil install 후 RecoilRoot로 감싸주기
  const [queryClient] = useState(() => new QueryClient());

  // ! Next.js + Recoil.js ISSUE 대응
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
  useEffect(() => {
    console.log(pageProps.dehydratedState);
  }, [pageProps.dehydratedState]);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <KakaoScript />
          <GlobalStyles />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
