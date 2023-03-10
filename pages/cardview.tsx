import type { NextPage } from 'next';
import { useState, useEffect, useRef, useCallback } from 'react';
import * as Typo from '@/components/Typography';
import * as Styled from '@/styles/cardview.module';
import { RowGap, ColGap, ColumnTemplate } from '@/styles/cardview.module';
import { FONT_COLOR } from '@/constants/color';
import * as Layout from '@/styles/layout.module';
import { fetchPopularCard } from '@/apis/card';

import { QueryFunctionContext, QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import { useResize, device } from '@/hooks/useResize';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useLocalStorage from '@/hooks/useLocalStorage';

import { Card, CardProps } from '@/components/Atom/Card';

// https://velog.io/@hdpark/React-Query%EC%99%80-%ED%95%A8%EA%BB%98%ED%95%98%EB%8A%94-Next.js-%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4

const CardView: NextPage = () => {
  const device = useResize();
  return (
    <Layout.GridContainer
      colGap={`${ColGap}px`}
      rowGap={`${RowGap}px`}
      tabletColums={`repeat(4, ${ColumnTemplate})`}
      desktopColums={`repeat(6, ${ColumnTemplate})`}
    >
      <CardCategory></CardCategory>
      <PopularCard device={device}></PopularCard>
      <AllCard device={device}></AllCard>
    </Layout.GridContainer>
  );
};

// 카테고리 버튼
const CardCategory = () => {
  return (
    <>
      <Typo.H1 color={FONT_COLOR.WHITE}>다른 사람들의 카드</Typo.H1>
    </>
  );
};

// 이달의 회고
const PopularCard = ({ device }: { device: device }) => {
  const [testCardContent, setTestCardContent] = useState<{ data: CardProps['content'][] }>({
    data: [
      {
        category: 'develop',
        header: 'hackerrank - Nested Lists',
        body: 'Given the names and grades for each 123123123123123',
        img: require('@/assets/images/test.png') as string,
        name: '김선철',
        date: '2023.01.07',
      },
      {
        category: 'develop',
        header: 'hackerrank - Nested Lists',
        body: 'Given the names and grades for each 123123123123123',
        img: require('@/assets/images/test.png') as string,
        name: '김선철',
        date: '2023.01.07',
      },
      {
        category: 'develop',
        header: 'hackerrank - Nested Lists',
        body: 'Given the names and grades for each 123123123123123',
        img: require('@/assets/images/test.png') as string,
        name: '김선철',
        date: '2023.01.07',
      },
    ],
  });

  const onClickTag = useCallback(
    (): CardProps['onClickTag'] => (e, tag) => {
      console.log(`${tag} 태그 클릭`);
    },
    [],
  );

  const onClickContent = useCallback(() => {
    () => {
      console.log('본문 클릭');
    };
  }, []);

  const onClickUser = useCallback(() => {
    () => {
      console.log('user 클릭');
    };
  }, []);

  return (
    <Styled.PopularCardViewContainer>
      <Styled.PopularCardHeader>
        <Typo.H1 color={FONT_COLOR.WHITE}>이번주의 회고</Typo.H1>
      </Styled.PopularCardHeader>
      <Styled.PopularCardContent>
        {testCardContent.data.map((test, index) => {
          return (
            <Styled.PopularCardItem key={`popular-${index}`}>
              <Card
                size={device === 'desktop' ? 'lg' : 'mobile'}
                content={test}
                hasBadge={true}
                onClickTag={onClickTag}
                onClickContent={onClickContent}
                onClickUser={onClickUser}
              ></Card>
            </Styled.PopularCardItem>
          );
        })}
      </Styled.PopularCardContent>
    </Styled.PopularCardViewContainer>
  );
};

// 15개 임시 데이터
const testData: { data: CardProps['content'][] } = {
  data: [
    {
      category: 'develop',
      header: 'hackerrank - Nested Lists',
      body: 'Given the names and grades for each 123123123123123',
      img: require('@/assets/images/test.png') as string,
      name: '김선철',
      date: '2023.01.07',
    },
    {
      category: 'develop',
      header: 'hackerrank - Nested Lists',
      body: 'Given the names and grades for each 123123123123123',
      img: require('@/assets/images/test.png') as string,
      name: '김선철',
      date: '2023.01.07',
    },
    {
      category: 'develop',
      header: 'hackerrank - Nested Lists',
      body: 'Given the names and grades for each 123123123123123',
      img: require('@/assets/images/test.png') as string,
      name: '김선철',
      date: '2023.01.07',
    },
    {
      category: 'develop',
      header: 'hackerrank - Nested Lists',
      body: 'Given the names and grades for each 123123123123123',
      img: require('@/assets/images/test.png') as string,
      name: '김선철',
      date: '2023.01.07',
    },
    {
      category: 'develop',
      header: 'hackerrank - Nested Lists',
      body: 'Given the names and grades for each 123123123123123',
      img: require('@/assets/images/test.png') as string,
      name: '김선철',
      date: '2023.01.07',
    },
    {
      category: 'develop',
      header: 'hackerrank - Nested Lists',
      body: 'Given the names and grades for each 123123123123123',
      img: require('@/assets/images/test.png') as string,
      name: '김선철',
      date: '2023.01.07',
    },
    {
      category: 'develop',
      header: 'hackerrank - Nested Lists',
      body: 'Given the names and grades for each 123123123123123',
      img: require('@/assets/images/test.png') as string,
      name: '김선철',
      date: '2023.01.07',
    },
    {
      category: 'develop',
      header: 'hackerrank - Nested Lists',
      body: 'Given the names and grades for each 123123123123123',
      img: require('@/assets/images/test.png') as string,
      name: '김선철',
      date: '2023.01.07',
    },
    {
      category: 'develop',
      header: 'hackerrank - Nested Lists',
      body: 'Given the names and grades for each 123123123123123',
      img: require('@/assets/images/test.png') as string,
      name: '김선철',
      date: '2023.01.07',
    },
    {
      category: 'develop',
      header: 'hackerrank - Nested Lists',
      body: 'Given the names and grades for each 123123123123123',
      img: require('@/assets/images/test.png') as string,
      name: '김선철',
      date: '2023.01.07',
    },
    {
      category: 'develop',
      header: 'hackerrank - Nested Lists',
      body: 'Given the names and grades for each 123123123123123',
      img: require('@/assets/images/test.png') as string,
      name: '김선철',
      date: '2023.01.07',
    },
    {
      category: 'develop',
      header: 'hackerrank - Nested Lists',
      body: 'Given the names and grades for each 123123123123123',
      img: require('@/assets/images/test.png') as string,
      name: '김선철',
      date: '2023.01.07',
    },
    {
      category: 'develop',
      header: 'hackerrank - Nested Lists',
      body: 'Given the names and grades for each 123123123123123',
      img: require('@/assets/images/test.png') as string,
      name: '김선철',
      date: '2023.01.07',
    },
    {
      category: 'develop',
      header: 'hackerrank - Nested Lists',
      body: 'Given the names and grades for each 123123123123123',
      img: require('@/assets/images/test.png') as string,
      name: '김선철',
      date: '2023.01.07',
    },
    {
      category: 'develop',
      header: 'hackerrank - Nested Lists',
      body: 'Given the names and grades for each 123123123123123',
      img: require('@/assets/images/test.png') as string,
      name: '김선철',
      date: '2023.01.07',
    },
  ],
};

// 전체 회고
const AllCard = ({ device }: { device: device }) => {
  const [testCardList, setTestCardList] = useState(testData);
  const bottom = useRef(null);
  const [scrollY, setScrollY] = useLocalStorage<number>('card_view_list_scroll', 0);

  const getCardList = () => {
    // TODO 카드 리스트 받아오는 API 추가 필요
    //   axios
    //     .get('', {
    //       params: {},
    //     })
    //     .then((res) => res?.data);
    setTestCardList((prev) => ({
      data: [
        ...prev.data,
        testCardList.data[0],
        testCardList.data[0],
        testCardList.data[0],

        testCardList.data[0],
        testCardList.data[0],
        testCardList.data[0],

        testCardList.data[0],
        testCardList.data[0],
        testCardList.data[0],
      ],
    }));
  };

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery(
    ['cardList'],
    getCardList,
    {
      //   이어서 다음 api를 요청할 때 사용될 pageParam값을 정하기.
      //   getNextPageParam: (lastPage) => {
      //     return lastPage;
      //   },
    },
  );

  const [observe, unobserve] = useIntersectionObserver((entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) getCardList();
  });

  useEffect(() => {
    const optionref = bottom.current;
    if (optionref) observe(optionref);
    return () => {
      if (optionref) unobserve(optionref);
    };
  }, [observe, unobserve]);

  // 무한스크롤 적용 후 해당 페이지 갔다가 뒤로 왔을때 해당 위치로 스크롤하기
  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  const onClickTag: CardProps['onClickTag'] = (e, tag) => {
    console.log(`${tag} 태그 클릭`);
    setScrollY(window.scrollY);
  };

  const onClickContent = () => {
    console.log('본문 클릭');
    setScrollY(window.scrollY);
  };

  const onClickUser = () => {
    console.log('user 클릭');
    setScrollY(window.scrollY);
  };

  return (
    <>
      <Styled.AllCardViewContainer>
        <Styled.AllCardHeader>
          <Typo.H1 color={FONT_COLOR.WHITE}>전체 회고</Typo.H1>
        </Styled.AllCardHeader>
        <Styled.AllCardContent>
          {testCardList.data.map((testCardItem, index) => {
            return (
              <Styled.AllCardItem key={`card-${index}`}>
                <Card
                  size={device === 'desktop' ? 'lg' : 'mobile'}
                  content={testCardItem}
                  onClickTag={onClickTag}
                  onClickContent={onClickContent}
                  onClickUser={onClickUser}
                ></Card>
              </Styled.AllCardItem>
            );
          })}
        </Styled.AllCardContent>
      </Styled.AllCardViewContainer>
      <div ref={bottom} />
    </>
  );
};

export default CardView;

// export async function getStaticProps() {
//   const data = fetchPopularCard();
//   return {
//     props: { data },
//     revalidate: 60 * 60,
//   };
// }
