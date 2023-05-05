import * as Typo from '@/components/Atom/Typography';
import * as Styled from './styles';
import * as CardView from '@/styles/cardview.module';
import { FONT_COLOR } from '@/constants/color';

import { device } from '@/hooks/useResize';

import { Card, CardProps } from '@/components/Atom/Card';
import { useRecoilState } from 'recoil';
import { categoryState } from '@/states/cardview';
import { formatDate } from '@/utils/utils';
import { findSelectedCategory } from '@/utils/cardview';
import { useRecommandPosts } from '@/hooks/queries/cardviewQuery';

// 이달의 회고
const PopularCard = ({
  device,
  onClickContent,
  onClickUser,
}: {
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
      <Styled.PopularCardContent isEmpty={recommandCard?.postList.length === 0}>
        {recommandCard?.postList.length === 0 ? (
          <CardView.EmptyCard>
            <Typo.H2 color={FONT_COLOR.GRAY_2}>작성된 회고 글이 없습니다.</Typo.H2>
          </CardView.EmptyCard>
        ) : (
          isSuccess &&
          recommandCard?.postList.map((recommandItem, index) => {
            return (
              <Styled.PopularCardItem key={`popular-${recommandItem.identifier}-${index}`}>
                <Card
                  size={device === 'desktop' ? 'lg' : 'mobile'}
                  content={{
                    category: categories.find((i) => i.identifier === recommandItem.categoryIdentifier)?.name!,
                    header: recommandItem.title,
                    body: recommandItem.description,
                    img: require('@/assets/images/test.png') as string,
                    name: recommandItem.userPath,
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
          })
        )}
      </Styled.PopularCardContent>
    </Styled.PopularCardViewContainer>
  );
};

export { PopularCard };
