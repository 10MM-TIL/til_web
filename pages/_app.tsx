import type { AppProps } from 'next/app';
import GlobalStyles from '@/styles/globals';
import { Layout } from '@/components/common';
import { RecoilEnv, RecoilRoot } from 'recoil';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// react-query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false, // 컴포넌트가 마운트될 때, refetch
      refetchOnReconnect: true, // 네트워크가 재연결될 때, refetch
      refetchOnWindowFocus: false, // 브라우저 탭이 활성화될 때, refetch
      retry: 0, // query 호출 실패 시, 재호출 시도 횟수
      useErrorBoundary: false,
      cacheTime: 1000 * 60 * 30, // TODO: 임시
      staleTime: 1000 * 60 * 30, // TODO: 임시
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  // ! Next.js + Recoil.js ISSUE 대응
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps?.dehydratedState}>
          <GlobalStyles />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
