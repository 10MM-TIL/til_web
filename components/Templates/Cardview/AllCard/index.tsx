import { useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { formatDate } from '@/utils/utils';

import { FONT_COLOR } from '@/constants/color';

import { useAllPosts } from '@/hooks/queries/cardviewQuery';
import { device } from '@/hooks/useResize';

import * as Typo from '@/components/Atom/Typography';
import { Card, CardProps } from '@/components/Atom/Card';
import { CategoryQueryKeys } from '@/components/Atom/Card/types';
import InfiniteScrollLayout from '@/components/Layout/InfiniteScroll';

import { categoryState } from '@/stores/cardviewStateStore';

import { allPostItem } from '@/types/cardview';

import * as Styled from './styles';
import * as CardView from '@/styles/cardview.module';
import Spinner from '@/components/Atom/Spinner';
import { useRetrospects } from '@/hooks/queries/retrospectCardviewQuery';
import { RetrospectItem } from '@/apis/retrospectCardview';

const AllCardItem = ({
  allCardItem,
  cardSize,
  onClickUser,
}: {
  allCardItem: RetrospectItem;
  cardSize: CardProps['size'];
  onClickUser: CardProps['onClickUser'];
}) => {
  const categories = useRecoilValue(categoryState);
  const bodyText = allCardItem.qna[0]?.answer ?? '';

  return (
    <Styled.AllCardItem>
      <Card
        size={cardSize}
        content={{
          category: categories.find((i) => i.identifier === allCardItem.categoryIdentifier)?.name || '#개발',
          header: allCardItem.questionTypeName,
          body: allCardItem.isSecret ? '비공개 게시글입니다.' : bodyText,
          img: '',
          name: allCardItem.userName,
          date: formatDate(allCardItem.createdAt),
        }}
        userpath={allCardItem.userPath}
        onClickUser={() => onClickUser(allCardItem.userPath)}
        isPrivate={allCardItem.isSecret}
        item={allCardItem}
      />
    </Styled.AllCardItem>
  );
};

const AllCardList = ({
  allCardList,
  device,
  ...rest
}: {
  allCardList: RetrospectItem[];
  device: device;
  onClickUser: CardProps['onClickUser'];
}) => {
  return (
    <>
      {allCardList.map((allCard, index) => (
        <AllCardItem
          key={`card-${allCard.retrospectIdentifier}-${index}`}
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
  onClickUser: CardProps['onClickUser'];
}) => {
  const { data: allRetrospects, fetchNextPage, isSuccess, isFetchingNextPage } = useRetrospects(props.categoryQuery);
  const intersectCallback = (entry: IntersectionObserverEntry) => {
    if (
      allRetrospects &&
      (allRetrospects.pages[allRetrospects.pages.length - 1].nextPageToken === '' ||
        allRetrospects.pages[allRetrospects.pages.length - 1].nextPageToken === null)
    ) {
      return;
    }
    fetchNextPage();
  };

  return (
    <Styled.AllCardViewContainer>
      <Styled.AllCardHeader>
        <Typo.H1 color={FONT_COLOR.WHITE}>전체 회고</Typo.H1>
      </Styled.AllCardHeader>
      <InfiniteScrollLayout
        intersectCallback={intersectCallback}
        option={{ rootMargin: '0px 0px 150px 0px', threshold: [0, 0.3, 0.5, 1] }}
      >
        {isSuccess && (
          <Styled.AllCardContent isEmpty={allRetrospects.pages[0].retrospects.length === 0}>
            {allRetrospects.pages[0].retrospects.length === 0 ? (
              <EmptyCard></EmptyCard>
            ) : (
              <>
                {allRetrospects.pages.map((allRetro, index) => {
                  return <AllCardList key={index} allCardList={allRetro.retrospects} {...props}></AllCardList>;
                })}
              </>
            )}
          </Styled.AllCardContent>
        )}
        {isFetchingNextPage && (
          <Styled.SpinnerContainer>
            <Spinner size='35px'></Spinner>
          </Styled.SpinnerContainer>
        )}
      </InfiniteScrollLayout>
    </Styled.AllCardViewContainer>
  );
};

export default AllCard;
