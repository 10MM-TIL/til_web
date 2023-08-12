import { useRecoilState } from 'recoil';
import { formatDate } from '@/utils/utils';
import { findSelectedCategory } from '@/utils/cardview';

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

const PopularCardItem = ({
  categories,
  recommandItem,
  cardSize,
  onClickContent,
  onClickUser,
}: {
  categories: categories[];
  recommandItem: recommandPostItem;
  cardSize: CardProps['size'];
  onClickContent: CardProps['onClickContent'];
  onClickUser: CardProps['onClickUser'];
}) => {
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
      ></Card>
    </Styled.PopularCardItem>
  );
};

const PopularCardList = ({
  recommandCardList,
  categories,
  device,
  ...rest
}: {
  categories: categories[];
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
            categories={categories}
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
  device: device;
  onClickContent: CardProps['onClickContent'];
  onClickUser: CardProps['onClickUser'];
}) => {
  const [categories, setCategories] = useRecoilState(categoryState);

  const { data: recommandCard, isSuccess } = useRecommandPosts(
    findSelectedCategory(categories),
    !!findSelectedCategory(categories),
  );

  return (
    <Styled.PopularCardViewContainer>
      <Styled.PopularCardHeader>
        <Typo.H1 color={FONT_COLOR.WHITE}>이번주의 회고</Typo.H1>
      </Styled.PopularCardHeader>
      {isSuccess && (
        <Styled.PopularCardContent isEmpty={recommandCard.posts.length === 0}>
          <>
            {recommandCard.posts.length === 0 ? (
              <EmptyPopularCard></EmptyPopularCard>
            ) : (
              <PopularCardList
                recommandCardList={recommandCard.posts}
                categories={categories}
                {...props}
              ></PopularCardList>
            )}
          </>
        </Styled.PopularCardContent>
      )}
    </Styled.PopularCardViewContainer>
  );
};

export default PopularCard;
