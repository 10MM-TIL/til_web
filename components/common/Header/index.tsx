import { IconLogo } from '@/assets/svgs/IconLogo';

import { useResize } from '@/hooks/useResize';
import { css } from '@emotion/react';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.styled';
import { Button } from '@/components/Atom/Button';

import * as Typo from '@/components/Atom/Typography';
import { POINT_COLOR } from '@/constants/color';

interface HeaderProps {
  onModalOn: (flag: boolean) => void;
}

const Header = ({ onModalOn }: HeaderProps) => {
  const [isLogin, setIsLogin] = useState(false);
  const device = useResize();

  // TODO Desktop에서 마이페이지 버튼, 로그인 이후에 변경되는 UI

  return (
    <header css={styles.container}>
      <div css={styles.inner({ isMobile: device === 'mobile' })}>
        <div css={styles.logoContainer}>
          <Link href={'/'} css={css``}>
            <IconLogo />
          </Link>
          {/* desktop && isLogin => 마이페이지 이동 버튼 */}
        </div>
        {isLogin ? (
          <></>
        ) : (
          <button css={styles.btn} onClick={() => onModalOn(true)}>
            로그인
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
