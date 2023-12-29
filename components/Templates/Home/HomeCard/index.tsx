import { useRouter } from 'next/router';
import Link from 'next/link';
import { formatDate } from '@/utils/utils';

import { FONT_COLOR } from '@/constants/color';

import * as Typo from '@/components/Atom/Typography';
import { Card } from '@/components/Atom/Card';
import Footer from '@/components/Atom/Footer';

import { useCategories } from '@/hooks/queries/categoryQuery';

import { elementContainer, elementTitle } from './styles';
import { MyUserModel } from '@/types/index';
import { useRecommendRetrospects, useRetrospects } from '@/hooks/queries/retrospectCardviewQuery';

const HomeCard = ({ userData }: { userData?: MyUserModel }) => {
  const router = useRouter();
  const { data: categoryData, isSuccess: isSuccessCategory } = useCategories();
  const { data: retrospectsData, isSuccess: isSuccessRetrospects } = useRetrospects('all');
  const { data: recommendData, isSuccess: isSuccessRecommand } = useRecommendRetrospects(
    userData ? userData.categoryIdentifier : 'all',
    true,
  );

  const onClickUser = (userpath: string = '') => {
    router.push(`/@${userpath}`);
  };

  return (
    <>
      <div css={elementContainer}>
        <div css={elementTitle}>
          <Typo.H1 color='#D2D2D2'>다른 사람들의 카드</Typo.H1>
          <Link href='/cardview'>
            <Typo.Body color={FONT_COLOR.GRAY_2}>더보기</Typo.Body>
          </Link>
        </div>
        {isSuccessRetrospects && retrospectsData.pages[0].retrospects.length === 0 ? (
          <Typo.H2 color={FONT_COLOR.GRAY_2}>작성된 회고 글이 없습니다.</Typo.H2>
        ) : (
          isSuccessCategory && (
            <>
              {isSuccessRecommand &&
                recommendData.retrospects.map((recommandItem, index) => {
                  const bodyText = recommandItem.qna[0].answer;

                  return (
                    <Card
                      key={recommandItem.createdAt + index + 'mobile'}
                      size={'sm'}
                      content={{
                        category: categoryData.categories.find((i) => i.identifier === recommandItem.categoryIdentifier)
                          ?.name!,
                        header: recommandItem.questionTypeName,
                        body: recommandItem.isSecret ? '비공개 게시글입니다.' : bodyText,
                        img: '',
                        name: recommandItem.userName,
                        date: formatDate(recommandItem.createdAt),
                      }}
                      hasBadge={true}
                      userpath={recommandItem.userPath}
                      onClickUser={() => onClickUser(recommandItem.userPath)}
                      isPrivate={recommandItem.isSecret}
                      item={recommandItem}
                    />
                  );
                })}
              {isSuccessRetrospects &&
                retrospectsData?.pages[0].retrospects?.slice(0, 6)?.map((retro, idx) => {
                  const bodyText = retro.qna[0]?.answer ?? '';

                  return (
                    <div key={retro?.createdAt + idx + 'desktop'}>
                      <Card
                        size={'sm'}
                        content={{
                          category: categoryData.categories.find((i) => i.identifier === retro.categoryIdentifier)
                            ?.name!,
                          header: retro.questionTypeName,
                          body: retro.isSecret ? '비공개 게시글입니다.' : bodyText,
                          img: '',
                          name: retro.userName,
                          date: formatDate(retro.createdAt),
                        }}
                        userpath={retro.userPath}
                        onClickUser={() => onClickUser(retro.userPath)}
                        isPrivate={retro.isSecret}
                        item={retro}
                      />
                    </div>
                  );
                })}
            </>
          )
        )}
        <Footer />
      </div>
    </>
  );
};
export default HomeCard;
