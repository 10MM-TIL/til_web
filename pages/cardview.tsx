import type { NextPage } from 'next';
import { useState, useEffect, useRef, useCallback, MouseEventHandler } from 'react';
import * as Typo from '@/components/Atom/Typography';
import * as Styled from '@/styles/cardview.module';
import { RowGap, ColGap, ColumnTemplate } from '@/styles/cardview.module';
import { FONT_COLOR } from '@/constants/color';
import * as Layout from '@/styles/layout.module';

import { dehydrate, QueryClient, useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { useResize, device } from '@/hooks/useResize';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useLocalStorage from '@/hooks/useLocalStorage';

import { Card, CardProps } from '@/components/Atom/Card';
import axios, { all, AxiosResponse } from 'axios';
import { useRecoilState, GetRecoilValue } from 'recoil';
import { categoryState } from '@/states/cardview';
import { categoriesResponse, categories, allPostResponse, recommandPostResponse, allPostList } from '@/types/cardview';
import { formatDate } from '@/utils/utils';

// const API_URL = 'http://152.69.231.228:8080/v1';
// https://velog.io/@hdpark/React-Query%EC%99%80-%ED%95%A8%EA%BB%98%ED%95%98%EB%8A%94-Next.js-%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4

// !TODO 카테고리, 이름 수정 필요

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

const getCategories = async () => {
  const response = await axios.get<categoriesResponse>(`${process.env.NEXT_PUBLIC_API_URL}/v1/categories`);
  return response.data;
};

// 카테고리 버튼
const CardCategory = () => {
  const { data } = useQuery({ queryKey: ['categories'], queryFn: () => getCategories() });
  const [categories, setCategories] = useRecoilState(categoryState);

  // category 저장
  useEffect(() => {
    if (data)
      setCategories(
        data.categories.map((category, index) => {
          if (index === 0) return { ...category, selected: true };
          else return { ...category, selected: false };
        }),
      );
  }, [data, setCategories]);

  return (
    <>
      <Typo.H1 color={FONT_COLOR.WHITE}>다른 사람들의 카드</Typo.H1>
      {categories &&
        categories?.map((i) => {
          return <div key={i.identifier}>{i.name}</div>;
        })}
    </>
  );
};

const findSelectedCategory = (categories: categories[]) => {
  return categories[categories.findIndex((category) => category.selected === true)]?.identifier.match(
    /value=(.*)\)/,
  )![1];
};
// 이달의 회고
const PopularCard = ({
  device,
  onClickTag,
  onClickContent,
  onClickUser,
}: {
  device: device;
  onClickTag: CardProps['onClickTag'];
  onClickContent: CardProps['onClickContent'];
  onClickUser: CardProps['onClickUser'];
}) => {
  const [recommandCardContent, setRecommandCardContent] = useState<
    (CardProps['content'] & { identifier: string; url?: string })[]
  >([]);
  const [categories, setCategories] = useRecoilState(categoryState);

  const getRecommandPosts = async (category: string) => {
    const response = await axios.get<recommandPostResponse>(`/v1/post/category/recommend`, {
      params: { value: category },
    });
    return response.data;
  };

  const { data: recommandCard } = useQuery({
    queryKey: ['recommand_card'],
    queryFn: () => getRecommandPosts(findSelectedCategory(categories)),
    retry: 2,
    enabled: categories.length !== 0,
  });

  useEffect(() => {
    if (recommandCard) {
      setRecommandCardContent(
        recommandCard.postList.map((postItem) => {
          return {
            identifier: postItem.identifier,
            category: categories.map((i) => {
              if (i.identifier === postItem.categoryIdentifier) return i.name;
              else return 'develop';
            })[0] as 'develop',
            header: postItem.title,
            body: postItem.description,
            img: require('@/assets/images/test.png') as string,
            name: postItem.identifier,
            date: formatDate(postItem.createdAt),
            url: postItem.url,
          };
        }),
      );
    }
  }, [recommandCard, categories]);

  return (
    <Styled.PopularCardViewContainer>
      <Styled.PopularCardHeader>
        <Typo.H1 color={FONT_COLOR.WHITE}>이번주의 회고</Typo.H1>
      </Styled.PopularCardHeader>
      <Styled.PopularCardContent>
        {recommandCardContent.map((recommandCard, index) => {
          return (
            <Styled.PopularCardItem key={`popular-${recommandCard.identifier}-${index}`}>
              <Card
                size={device === 'desktop' ? 'lg' : 'mobile'}
                content={recommandCard}
                hasBadge={true}
                onClickTag={onClickTag}
                onClickContent={() => onClickContent(recommandCard.url)}
                onClickUser={onClickUser}
              ></Card>
            </Styled.PopularCardItem>
          );
        })}
      </Styled.PopularCardContent>
    </Styled.PopularCardViewContainer>
  );
};

// 전체 회고
const AllCard = ({
  device,
  onClickTag,
  onClickContent,
  onClickUser,
}: {
  device: device;
  onClickTag: CardProps['onClickTag'];
  onClickContent: CardProps['onClickContent'];
  onClickUser: CardProps['onClickUser'];
}) => {
  const bottom = useRef(null);
  const [scrollY, setScrollY] = useLocalStorage<number>('card_view_list_scroll', 0);

  const [allCardContent, setAllCardContent] = useState<(CardProps['content'] & { identifier: string; url?: string })[]>(
    [],
  );
  const [categories, setCategories] = useRecoilState(categoryState);

  // 카테고리별 포스트 불러오기
  const fetchAllPosts = async (category: string, pageToken: string) => {
    const response = await axios.get<allPostResponse>(`/v1/post/category`, {
      params: pageToken ? { value: category, size: 3 * 5, pageToken } : { value: category, size: 3 * 5 },
    });
    return response.data;
  };

  const { data: allCard, fetchNextPage } = useInfiniteQuery(
    ['all_category_card_infinite'],
    ({ pageParam = '' }) => fetchAllPosts(findSelectedCategory(categories), pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextPageToken;
      },
    },
  );

  useEffect(() => {
    if (allCard) {
      const pageLastIdx = allCard.pages.length - 1;
      const allCardList = allCard?.pages[pageLastIdx];
      setAllCardContent((prev) => [
        ...prev,
        ...allCardList.postList.map((postItem) => {
          return {
            identifier: postItem.identifier,
            category: categories.map((i) => {
              if (i.identifier === postItem.categoryIdentifier) return i.name;
              else return 'develop';
            })[0] as 'develop',
            header: postItem.title,
            body: postItem.description,
            img: require('@/assets/images/test.png') as string,
            name: postItem.identifier,
            date: formatDate(postItem.createdAt),
            url: postItem.url,
          };
        }),
      ]);
    }
  }, [allCard, categories]);

  const [observe, unobserve] = useIntersectionObserver((entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      if (!allCard?.pages[allCard.pages.length - 1].nextPageToken) return;
      fetchNextPage();
    }
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

  return (
    <>
      <Styled.AllCardViewContainer>
        <Styled.AllCardHeader>
          <Typo.H1 color={FONT_COLOR.WHITE}>전체 회고</Typo.H1>
        </Styled.AllCardHeader>
        <Styled.AllCardContent>
          {allCardContent.map((allCard, index) => {
            return (
              <Styled.AllCardItem key={`card-${allCard.identifier}-${index}`}>
                <Card
                  size={device === 'desktop' ? 'lg' : 'mobile'}
                  content={allCard}
                  onClickTag={onClickTag}
                  onClickContent={() => onClickContent(allCard.url)}
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

export async function getServerSideProps() {
  try {
    await queryClient.prefetchQuery({ queryKey: ['categories'], queryFn: () => getCategories() });
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  } finally {
    queryClient.clear();
  }
}
