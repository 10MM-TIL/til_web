import type { NextPage } from 'next';
import { useCallback } from 'react';

import { RowGap, ColGap, ColumnTemplate } from '@/styles/cardview.module';
import * as Layout from '@/styles/layout.module';

import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useResize } from '@/hooks/useResize';

import { CardProps } from '@/components/Atom/Card';
import axios from 'axios';
import { categoriesResponse } from '@/types/cardview';
import { CardCategory, PopularCard, AllCard } from '@/components/Templates/Cardview';

// const API_URL = 'http://152.69.231.228:8080/v1';
// https://velog.io/@hdpark/React-Query%EC%99%80-%ED%95%A8%EA%BB%98%ED%95%98%EB%8A%94-Next.js-%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4

const CardView = () => {
  const device = useResize();

  const onClickContent = useCallback((url: string = '') => {
    console.log(url, '본문 클릭');
    // setScrollY(window.scrollY);
  }, []);

  const onClickTag: CardProps['onClickTag'] = useCallback((e, tag) => {
    console.log(`${tag} 태그 클릭`);
    // setScrollY(window.scrollY);
  }, []);

  const onClickUser = useCallback(() => {
    console.log('user 클릭');
    // setScrollY(window.scrollY);
  }, []);

  return (
    <Layout.GridContainer
      colGap={`${ColGap}px`}
      rowGap={`${RowGap}px`}
      tabletColums={`repeat(4, ${ColumnTemplate})`}
      desktopColums={`repeat(6, ${ColumnTemplate})`}
      css={{ paddingTop: '114px' }}
    >
      <CardCategory></CardCategory>
      <PopularCard
        device={device}
        onClickContent={onClickContent}
        onClickTag={onClickTag}
        onClickUser={onClickUser}
      ></PopularCard>
      <AllCard
        device={device}
        onClickContent={onClickContent}
        onClickTag={onClickTag}
        onClickUser={onClickUser}
      ></AllCard>
    </Layout.GridContainer>
  );
};

// const getCategories = async () => {
//   const response = await axios.get<categoriesResponse>(`${process.env.NEXT_PUBLIC_API_URL}/v1/categories`);
//   return response.data;
// };

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60,
//     },
//   },
// });

// export async function getServerSideProps() {
//   try {
//     await queryClient.prefetchQuery({ queryKey: ['categories'], queryFn: () => getCategories() });
//     return {
//       props: {
//         dehydratedState: dehydrate(queryClient),
//       },
//     };
//   } catch (e) {
//     return {
//       props: {},
//     };
//   } finally {
//     queryClient.clear();
//   }
// }

export default CardView;
