import { useState, useEffect, useRef, useCallback } from 'react';
import * as Typo from '@/components/Atom/Typography';
import * as Styled from './styles';
import * as CardView from '@/styles/cardview.module';

import { FONT_COLOR } from '@/constants/color';

import { useInfiniteQuery } from '@tanstack/react-query';

import { device } from '@/hooks/useResize';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useLocalStorage from '@/hooks/useLocalStorage';

import { Card, CardProps } from '@/components/Atom/Card';
import { useRecoilState } from 'recoil';
import { categoryState, allPostState } from '@/states/cardview';
import { formatDate } from '@/utils/utils';
import { findSelectedCategory } from '@/utils/cardview';
import { useAllPosts } from '@/hooks/queries/allPostQuery';

// 전체 회고
const AllCard = ({
  device,
  onClickContent,
  onClickUser,
}: {
  device: device;
  onClickContent: CardProps['onClickContent'];
  onClickUser: CardProps['onClickUser'];
}) => {
  const bottom = useRef(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [categories, setCategories] = useRecoilState(categoryState);
  const [allPostContent, setAllPostState] = useRecoilState(allPostState);
  const { data: allPosts, fetchNextPage, isSuccess } = useAllPosts(findSelectedCategory(categories));

  useEffect(() => {
    if (isSuccess) {
      const pageLastIdx = allPosts.pages.length - 1;
      const allCardList = allPosts?.pages[pageLastIdx].postList;
      setAllPostState((prev) => [
        ...prev,
        ...allCardList.map((postItem) => {
          return {
            identifier: postItem.identifier,
            userPath: postItem.userPath,
            category: categories.find((i) => i.identifier === postItem.categoryIdentifier)?.name!,
            header: postItem.title,
            body: postItem.description,
            // img: 'require(`postItem.userProfileSrc`)',
            img: require('@/assets/images/test.png'),
            name: postItem.identifier,
            date: formatDate(postItem.createdAt),
            url: postItem.url,
          };
        }),
      ]);
      console.log(allPostContent);
    }
  }, [allPosts, categories, setAllPostState, isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      setIsEmpty(allPostContent.length === 0);
    }
  }, [isSuccess, allPostContent]);

  const [observe, unobserve] = useIntersectionObserver((entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      if (!allPosts?.pages[allPosts.pages.length - 1].nextPageToken) return;
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

  const onClickTag: CardProps['onClickTag'] = useCallback((e, tag) => {
    console.log(`${tag} 태그 클릭`);
    // setScrollY(window.scrollY);
  }, []);

  return (
    <>
      <Styled.AllCardViewContainer>
        <Styled.AllCardHeader>
          <Typo.H1 color={FONT_COLOR.WHITE}>전체 회고</Typo.H1>
        </Styled.AllCardHeader>
        <Styled.AllCardContent isEmpty={isEmpty}>
          {isEmpty ? (
            <CardView.EmptyCard>
              <Typo.H2 color={FONT_COLOR.GRAY_2}>작성된 회고 글이 없습니다.</Typo.H2>
            </CardView.EmptyCard>
          ) : (
            allPostContent.map((allCard, index) => {
              return (
                <Styled.AllCardItem key={`card-${allCard.identifier}-${index}`}>
                  <Card
                    key={`card-${allCard.identifier}-${index}`}
                    size={device === 'desktop' ? 'lg' : 'mobile'}
                    content={allCard}
                    onClickTag={onClickTag}
                    onClickContent={onClickContent}
                    onClickUser={onClickUser}
                  ></Card>
                </Styled.AllCardItem>
              );
            })
          )}
        </Styled.AllCardContent>
      </Styled.AllCardViewContainer>
      <div ref={bottom} />
    </>
  );
};

export { AllCard };
