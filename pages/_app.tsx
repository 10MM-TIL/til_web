import GlobalStyles from '@/styles/globals';
import { useState } from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CommonLayout from '@/components/common/CommonLayout';
import { Header } from '@/components/Atom/Header';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <Header isLogin={true}></Header>
        <CommonLayout>
          <Component {...pageProps} />
        </CommonLayout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
