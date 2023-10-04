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

  const { data: userData } = useMyUser({ isLogin });
  const path = userData?.path;

  const handleModalOpen = () => {
    setIsLoginModalOpen({ isLoginModalOpen: true });
  };

  return (
    <header css={styles.container}>
      <div css={styles.headerBlurContainer}>
        <div css={styles.inner}>
          <div css={styles.logoContainer}>
            <Link href={'/'}>
              <IconLogo />
            </Link>
            {isLogin && (
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
                <Link href='/[user]' as={`/@${path}`}>
                  <Typo.H1 color={FONT_COLOR.GRAY_2}>마이페이지</Typo.H1>
                </Link>
              </div>
            )}
          </div>

          {/* 링크 변경 필요 */}
          <div css={styles.headerContentList}>
            <div css={styles.otherBtns}>
              <a href='/[user]' target='_blank'>
                <Typo.H1 color={FONT_COLOR.GRAY_2}>오픈채팅방</Typo.H1>
              </a>
              <a href='/[user]' target='_blank'>
                <Typo.H1 color={FONT_COLOR.GRAY_2}>업데이트 노트</Typo.H1>
              </a>
            </div>
            {!isLogin && (
              <button css={styles.loginBtn} onClick={handleModalOpen}>
                <Typo.Label1>로그인</Typo.Label1>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
