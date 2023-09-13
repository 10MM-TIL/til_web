import { useRouter } from 'next/router';
import Link from 'next/link';
import { formatDate } from '@/utils/utils';

import { FONT_COLOR } from '@/constants/color';

import * as Typo from '@/components/Atom/Typography';
import { Card } from '@/components/Atom/Card';
import Footer from '@/components/Atom/Footer';

import { useAllPosts, useRecommandPosts } from '@/hooks/queries/cardviewQuery';
import { useCategories } from '@/hooks/queries/categoryQuery';

import { elementContainer, elementTitle } from './styles';
import { MyUserModel } from '@/types/index';

const HomeCard = ({ userData }: { userData?: MyUserModel }) => {
  const router = useRouter();
  const { data: categoryData, isSuccess: isSuccessCategory } = useCategories();
  const { data: postsData, isSuccess: isSUccessAllpost } = useAllPosts('all');
  // 'all'로 필요할시 변경해주시면 됩니다.
  const { data: cardData, isSuccess: isSuccessRecommand } = useRecommandPosts(
    userData ? userData.categoryIdentifier : 'all',
    true,
  );

  const onClickContent = (url: string = '') => {
    window.open(url);
  };

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
        {isSUccessAllpost && postsData.pages[0].posts.length === 0 ? (
          <Typo.H2 color={FONT_COLOR.GRAY_2}>작성된 회고 글이 없습니다.</Typo.H2>
        ) : (
          isSuccessCategory && (
            <>
              {isSuccessRecommand &&
                cardData.posts.map((recommandItem, index) => (
                  <Card
                    key={recommandItem.createdAt + index + 'mobile'}
                    size={'sm'}
                    content={{
                      category: categoryData.categories.find((i) => i.identifier === recommandItem.categoryIdentifier)
                        ?.name!,
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
                  />
                ))}
              {isSUccessAllpost &&
                postsData?.pages[0].posts?.slice(0, 6)?.map((post, idx) => (
                  <div key={post?.createdAt + idx + 'desktop'}>
                    <Card
                      size={'sm'}
                      content={{
                        category: categoryData.categories.find((i) => i.identifier === post.categoryIdentifier)?.name!,
                        header: post.title,
                        body: post.summary,
                        img: post.profileImgSrc,
                        name: post.userName,
                        date: formatDate(post.createdAt),
                      }}
                      url={post.url}
                      userpath={post.userPath}
                      onClickContent={() => onClickContent(post.url)}
                      onClickUser={() => onClickUser(post.userPath)}
                    />
                  </div>
                ))}
            </>
          )
        )}
        <Footer></Footer>
      </div>
    </>
  );
};
export default HomeCard;
