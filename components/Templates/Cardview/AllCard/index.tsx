import { useState, useEffect, useRef } from 'react';
import * as Typo from '@/components/Atom/Typography';
import * as Styled from './styles';
import { FONT_COLOR } from '@/constants/color';

import { useInfiniteQuery } from '@tanstack/react-query';

import { device } from '@/hooks/useResize';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useLocalStorage from '@/hooks/useLocalStorage';

import { Card, CardProps } from '@/components/Atom/Card';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { categoryState } from '@/states/cardview';
import { categories, allPostResponse } from '@/types/cardview';
import { formatDate } from '@/utils/utils';

const findSelectedCategory = (categories: categories[]) => {
  return categories[categories.findIndex((category) => category.selected === true)]?.identifier.match(
    /value=(.*)\)/,
  )![1];
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

export { AllCard };
