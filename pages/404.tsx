import * as Typo from '@/components/Atom/Typography';
import { FONT_COLOR } from '@/constants/color';
import Image from 'next/image';
import { useResize } from '@/hooks/useResize';
import { Custom404Wrapper, ImageContainer, TextContainer } from '@/styles/404.module';
import { Button } from '@/components/Atom/Button';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import Icon404 from '@/assets/svgs/Icon404';
import Spinner from '@/components/Atom/Spinner';
import styles from '@/components/Molecules/OAuthLoading/OAuthLoading.styled';

const Loading = () => {
  return (
    <div css={styles.loadingContainer}>
      <div css={styles.spinnerContainer}>
        <Spinner size='46px' />
        <Typo.Body color={FONT_COLOR.WHITE}>Loading ... </Typo.Body>
      </div>
    </div>
  );
};

const Custom404 = ({ isReady }: { isReady: boolean }) => {
  const device = useResize();
  const errorText = `앗, 페이지를 찾을 수 없습니다.\n입력한 주소를 다시 확인해 주세요.`;
  const router = useRouter();
  const clickToHome = useCallback(() => {
    router.push('/');
  }, [router]);

  return isReady ? (
    <Loading />
  ) : (
    <>
      <Custom404Wrapper>
        <ImageContainer>
          <Icon404 isDesktop={device === 'desktop'} />
        </ImageContainer>
        <TextContainer>
          {device === 'desktop' ? (
            <Typo.Title color={FONT_COLOR.WHITE}>{errorText}</Typo.Title>
          ) : (
            <Typo.H1 color={FONT_COLOR.WHITE}>{errorText}</Typo.H1>
          )}
        </TextContainer>
        <Button size='x-lg-m' onClick={clickToHome}>
          브릭로그 홈으로 이동
        </Button>
      </Custom404Wrapper>
    </>
  );
};

export default Custom404;
