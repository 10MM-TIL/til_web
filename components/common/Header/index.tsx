import { IconLogo } from '@/assets/svgs/IconLogo';
import { Button } from '@/components/Atom/Button';
import { useResize } from '@/hooks/useResize';
import { css } from '@emotion/react';
import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  onModalOn: (flag: boolean) => void;
}

const Header = ({ onModalOn }: HeaderProps) => {
  const [isLogin, setIsLogin] = useState(false);
  const device = useResize();

  return (
    <header
      css={css`
        position: fixed;
        z-index: 999; // TODO Z-Index
        width: 100%;
        height: 80px;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 20px 20px 24px;
          max-width: 1194px;
          margin: 0 auto;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 24px;
          `}
        >
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
