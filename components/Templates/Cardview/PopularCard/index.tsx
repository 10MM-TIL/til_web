import { useState, useEffect } from 'react';
import * as Typo from '@/components/Atom/Typography';
import * as Styled from './styles';
import * as CardView from '@/styles/cardview.module';
import { FONT_COLOR } from '@/constants/color';

import { useQuery } from '@tanstack/react-query';

import { device } from '@/hooks/useResize';

import { Card, CardProps } from '@/components/Atom/Card';
import { useRecoilState } from 'recoil';
import { categoryState } from '@/states/cardview';
import { formatDate } from '@/utils/utils';
import { findSelectedCategory } from '@/utils/cardview';
import { fetchRecommandPosts } from '@/apis/cardview';

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

  const { data: recommandCard } = useQuery({
    queryKey: ['recommand_card'],
    queryFn: () => fetchRecommandPosts(findSelectedCategory(categories)),
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
      <Styled.PopularCardContent isEmpty={recommandCardContent.length === 0}>
        {recommandCardContent.length === 0 ? (
          <CardView.EmptyCard>
            <Typo.H2 color={FONT_COLOR.GRAY_2}>작성된 회고 글이 없습니다.</Typo.H2>
          </CardView.EmptyCard>
        ) : (
          recommandCardContent.map((recommandCard, index) => {
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
          })
        )}
      </Styled.PopularCardContent>
    </Styled.PopularCardViewContainer>
  );
};

export { PopularCard };
