import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { formatDate } from '@/utils/utils';

import { FONT_COLOR } from '@/constants/color';

import { useAllPosts } from '@/hooks/queries/cardviewQuery';
import { device } from '@/hooks/useResize';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

import * as Typo from '@/components/Atom/Typography';
import { Card, CardProps } from '@/components/Atom/Card';
import { CategoryQueryKeys } from '@/components/Atom/Card/types';
import InfiniteScrollLayout from '@/components/Layout/InfiniteScroll';

import { categoryState } from '@/stores/cardviewStateStore';

import { allPostItem, categories } from '@/types/cardview';

import * as Styled from './styles';
import * as CardView from '@/styles/cardview.module';

const AllCardItem = ({
  allCardItem,
  cardSize,
  onClickContent,
  onClickUser,
}: {
  allCardItem: allPostItem;
  cardSize: CardProps['size'];
  onClickContent: CardProps['onClickContent'];
  onClickUser: CardProps['onClickUser'];
}) => {
  const categories = useRecoilValue(categoryState);

  return (
    <Styled.AllCardItem>
      <Card
        size={cardSize}
        content={{
          category: categories.find((i) => i.identifier === allCardItem.categoryIdentifier)?.name || '#개발',
          header: allCardItem.title,
          body: allCardItem.summary,
          img: allCardItem.profileImgSrc,
          name: allCardItem.userName,
          date: formatDate(allCardItem.createdAt),
        }}
        url={allCardItem.url}
        userpath={allCardItem.userPath}
        onClickContent={() => onClickContent(allCardItem.url)}
        onClickUser={() => onClickUser(allCardItem.userPath)}
      ></Card>
    </Styled.AllCardItem>
  );
};

const AllCardList = ({
  allCardList,
  device,
  ...rest
}: {
  allCardList: allPostItem[];
  device: device;
  onClickContent: CardProps['onClickContent'];
  onClickUser: CardProps['onClickUser'];
}) => {
  return (
    <>
      {allCardList.map((allCard, index) => (
        <AllCardItem
          key={`card-${allCard.identifier}-${index}`}
          cardSize={device === 'desktop' ? 'lg' : 'mobile'}
          allCardItem={allCard}
          {...rest}
        ></AllCardItem>
      ))}
    </>
  );
};
const EmptyCard = () => {
  return (
    <CardView.EmptyCard>
      <Typo.H2 color={FONT_COLOR.GRAY_2}>작성된 회고 글이 없습니다.</Typo.H2>
    </CardView.EmptyCard>
  );
};
// 전체 회고
const AllCard = (props: {
  categoryQuery: CategoryQueryKeys;
  device: device;
  onClickContent: CardProps['onClickContent'];
  onClickUser: CardProps['onClickUser'];
}) => {
  const { data: allPosts, fetchNextPage, isSuccess } = useAllPosts(props.categoryQuery);

  const intersectCallback = (entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      if (allPosts && allPosts.pages[allPosts.pages.length - 1]?.nextPageToken === 'null') {
        console.log(allPosts.pages);
        return;
      }

      fetchNextPage();
    }
  };

  return (
    <Styled.AllCardViewContainer>
      <Styled.AllCardHeader>
        <Typo.H1 color={FONT_COLOR.WHITE}>전체 회고</Typo.H1>
      </Styled.AllCardHeader>
      <InfiniteScrollLayout intersectCallback={intersectCallback}>
        {isSuccess && (
          <Styled.AllCardContent isEmpty={allPosts.pages[0].posts.length === 0}>
            {allPosts.pages[0].posts.length === 0 ? (
              <EmptyCard></EmptyCard>
            ) : (
              allPosts.pages.map((allPost, index) => {
                return <AllCardList key={index} allCardList={allPost.posts} {...props}></AllCardList>;
              })
            )}
          </Styled.AllCardContent>
        )}
      </InfiniteScrollLayout>
    </Styled.AllCardViewContainer>
  );
};

export default AllCard;
