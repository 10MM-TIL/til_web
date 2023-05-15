import { useState, useEffect, useRef, useCallback } from 'react';
import * as Typo from '@/components/Atom/Typography';
import * as Styled from './styles';
import * as CardView from '@/styles/cardview.module';

import { FONT_COLOR } from '@/constants/color';

import { device } from '@/hooks/useResize';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

import { Card, CardProps } from '@/components/Atom/Card';
import { useRecoilState } from 'recoil';
import { categoryState } from '@/states/cardview';
import { formatDate } from '@/utils/utils';
import { findSelectedCategory } from '@/utils/cardview';
import { useAllPosts } from '@/hooks/queries/cardviewQuery';

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
  const { data: allPosts, fetchNextPage, isSuccess } = useAllPosts(findSelectedCategory(categories));

  useEffect(() => {
    if (isSuccess) {
      setIsEmpty(allPosts.pages[0]?.posts.length === 0);
    }
  }, [isSuccess, allPosts]);

  const [observe, unobserve] = useIntersectionObserver((entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      if (allPosts && allPosts.pages[allPosts.pages.length - 1]?.nextPageToken === 'null') return;
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
            isSuccess &&
            allPosts?.pages.map((allPost, index) =>
              allPost?.posts.map((allCard) => (
                <Styled.AllCardItem key={`card-${allCard.identifier}-${index}`}>
                  <Card
                    size={device === 'desktop' ? 'lg' : 'mobile'}
                    content={{
                      category: categories.find((i) => i.identifier === allCard.categoryIdentifier)?.name!,
                      header: allCard.title,
                      body: allCard.description,
                      img: require('@/assets/images/test.png'),
                      name: allCard.userPath,
                      date: formatDate(allCard.createdAt),
                    }}
                    url={allCard.url}
                    userpath={allCard.userPath}
                    onClickContent={() => onClickContent(allCard.url)}
                    onClickUser={() => onClickUser(allCard.userPath)}
                  ></Card>
                </Styled.AllCardItem>
              )),
            )
          )}
        </Styled.AllCardContent>
      </Styled.AllCardViewContainer>
      <div ref={bottom} />
    </>
  );
};

export { AllCard };
