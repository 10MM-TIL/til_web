import { IconLogo } from '@/assets/svgs/IconLogo';

import { useResize } from '@/hooks/useResize';
import { css } from '@emotion/react';
import Link from 'next/link';

import styles from './Header.styled';

import * as Typo from '@/components/Atom/Typography';
import { FONT_COLOR } from '@/constants/color';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AuthState } from '@/stores/authStateStore';
import { useMyUser } from '@/hooks/queries/profileQuery';
import { mq } from '@/styles/mediaQuery';
import IconApps from '@/assets/svgs/IconApps';
import Image from 'next/image';
import { LoginModalState } from '@/stores/modalStateStore';

const Header = () => {
  const device = useResize();

  const { isLogin } = useRecoilValue(AuthState);
  const setIsLoginModalOpen = useSetRecoilState(LoginModalState);

  const { data } = useMyUser({ isLogin });
  const userData = data?.data;

  return (
    <header css={styles.container}>
      <div css={styles.inner({ isMobile: device === 'mobile' })}>
        <div css={styles.logoContainer}>
          <Link href={'/'}>
            <IconLogo />
          </Link>
          {device === 'desktop' && isLogin && (
            <Link href='/mypage'>
              <Typo.H1 color={FONT_COLOR.GRAY_2}>마이페이지</Typo.H1>
            </Link>
          )}
        </div>
        {isLogin ? (
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 12px;
              ${mq('desktop')} {
                gap: 24px;
              }
            `}
          >
            {device === 'mobile' && (
              <Link href='/mypage'>
                <Typo.H1 color={FONT_COLOR.GRAY_2}>마이페이지</Typo.H1>
              </Link>
            )}
            <IconApps />
            {/* {userData && (
              <Image
                src={userData?.profileImgSrc}
                width={36}
                height={36}
                alt={'profile'}
                css={css`
                  border-radius: 100%;
                `}
              />
            )} */}
          </div>
        ) : (
          <button css={styles.btn} onClick={() => setIsLoginModalOpen({ isLoginModalOpen: true })}>
            로그인
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
