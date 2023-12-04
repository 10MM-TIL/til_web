import { useRecoilState, useRecoilValue } from 'recoil';
import { formatDate } from '@/utils/utils';

import { FONT_COLOR } from '@/constants/color';
import { categoryState } from '@/stores/cardviewStateStore';

import { useRecommandPosts } from '@/hooks/queries/cardviewQuery';
import { device } from '@/hooks/useResize';

import * as Typo from '@/components/Atom/Typography';
import { Card, CardProps } from '@/components/Atom/Card';
import { recommandPostItem } from '@/types/cardview';
import { categories } from '@/types/cardview';

import * as Styled from './styles';
import * as CardView from '@/styles/cardview.module';
import { CategoryQueryKeys } from '@/components/Atom/Card/types';

const PopularCardItem = ({
  recommandItem,
  cardSize,
  onClickContent,
  onClickUser,
}: {
  recommandItem: recommandPostItem;
  cardSize: CardProps['size'];
  onClickContent: CardProps['onClickContent'];
  onClickUser: CardProps['onClickUser'];
}) => {
  const categories = useRecoilValue(categoryState);

  return (
    <Styled.PopularCardItem>
      <Card
        size={cardSize}
        content={{
          category: categories.find((i) => i.identifier === recommandItem.categoryIdentifier)?.name || '#개발',
          header: recommandItem.title,
          body: recommandItem.summary,
          img: recommandItem.profileImgSrc,
          name: recommandItem.userName,
          date: formatDate(recommandItem.createdAt),
        }}
        hasBadge={true}
        url={recommandItem.url}
        userpath={recommandItem.userPath}
        onClickContent={() => onClickContent(recommandItem.url)}
        onClickUser={() => onClickUser(recommandItem.userPath)}
        isPrivate={false}
      />
    </Styled.PopularCardItem>
  );
};

const PopularCardList = ({
  recommandCardList,
  device,
  ...rest
}: {
  recommandCardList: recommandPostItem[];
  device: device;
  onClickContent: CardProps['onClickContent'];
  onClickUser: CardProps['onClickUser'];
}) => {
  return (
    <>
      {recommandCardList.map((recommandItem, index) => {
        return (
          <PopularCardItem
            key={`popular-${recommandItem.identifier}-${index}`}
            recommandItem={recommandItem}
            cardSize={device === 'desktop' ? 'lg' : 'mobile'}
            {...rest}
          ></PopularCardItem>
        );
      })}
    </>
  );
};

const EmptyPopularCard = () => {
  return (
    <CardView.EmptyCard>
      <Typo.H2 color={FONT_COLOR.GRAY_2}>작성된 회고 글이 없습니다.</Typo.H2>
    </CardView.EmptyCard>
  );
};
// 이달의 회고
const PopularCard = (props: {
  categoryQuery: CategoryQueryKeys;
  device: device;
  onClickContent: CardProps['onClickContent'];
  onClickUser: CardProps['onClickUser'];
}) => {
  const { data: recommandCard, isSuccess } = useRecommandPosts(props.categoryQuery, !!props.categoryQuery);

  return (
    <Styled.PopularCardViewContainer>
      <Styled.PopularCardHeader>
        <Typo.H1 color={FONT_COLOR.WHITE}>이번주의 회고</Typo.H1>
      </Styled.PopularCardHeader>
      {isSuccess && (
        <Styled.PopularCardContent isEmpty={recommandCard.posts.length === 0}>
          <>
            {recommandCard.posts.length === 0 ? (
              <EmptyPopularCard />
            ) : (
              <PopularCardList recommandCardList={recommandCard.posts} {...props}></PopularCardList>
            )}
          </>
        </Styled.PopularCardContent>
      )}
    </Styled.PopularCardViewContainer>
  );
};

export default PopularCard;
