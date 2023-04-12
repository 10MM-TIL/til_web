import { IconLogo } from '@/assets/svgs/IconLogo';
import { Button } from '@/components/Atom/Button';
import { useResize } from '@/hooks/useResize';
import { css } from '@emotion/react';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.styled';

interface HeaderProps {
  onModalOn: (flag: boolean) => void;
}

const Header = ({ onModalOn }: HeaderProps) => {
  const [isLogin, setIsLogin] = useState(false);
  const device = useResize();

  // TODO Desktop에서 마이페이지 버튼, 로그인 이후에 변경되는 UI

  return (
    <header css={styles.container}>
      <div css={styles.inner}>
        <div css={styles.logoContainer}>
          <Link href={'/'} css={css``}>
            <IconLogo />
          </Link>
          {/* desktop && isLogin => 마이페이지 이동 버튼 */}
        </div>
        {isLogin ? (
          <></>
        ) : (
          <Button types='sm' onClick={() => onModalOn(true)}>
            로그인
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
