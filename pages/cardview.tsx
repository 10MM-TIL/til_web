import { useCallback, useEffect } from 'react';

import { RowGap, ColGap, ColumnTemplate } from '@/styles/cardview.module';
import * as Layout from '@/styles/layout.module';

import { useResize } from '@/hooks/useResize';
import { useRouter } from 'next/router';
import { CardCategory, PopularCard, AllCard } from '@/components/Templates/Cardview';
import { GetServerSideProps } from 'next';

import { CategoryQueryKeys } from '@/components/Atom/Card/types';

// https://velog.io/@hdpark/React-Query%EC%99%80-%ED%95%A8%EA%BB%98%ED%95%98%EB%8A%94-Next.js-%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4

const CardView = ({ categoryQuery }: CardViewPageProps) => {
  const device = useResize();
  const router = useRouter();

  const onClickContent = useCallback((url: string = '') => {
    window.open(url);
  }, []);

  const onClickUser = useCallback(
    (userpath: string = '') => {
      router.push(`/@${userpath}`);
    },
    [router],
  );

  return (
    <Layout.Container>
      <Layout.GridContainer
        colGap={`${ColGap}px`}
        rowGap={`${RowGap}px`}
        tabletColums={`repeat(4, ${ColumnTemplate})`}
        desktopColums={`repeat(6, ${ColumnTemplate})`}
        css={{ paddingTop: '34px' }}
      >
        <CardCategory categoryQuery={categoryQuery}></CardCategory>
        <PopularCard categoryQuery={categoryQuery} device={device} onClickUser={onClickUser}></PopularCard>
        <AllCard categoryQuery={categoryQuery} device={device} onClickUser={onClickUser}></AllCard>
      </Layout.GridContainer>
    </Layout.Container>
  );
};
export type CardViewPageProps = { categoryQuery: CategoryQueryKeys };
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category } = context.query as { category: CategoryQueryKeys };
  return {
    props: { categoryQuery: category || 'all' },
  };
};

export default CardView;
