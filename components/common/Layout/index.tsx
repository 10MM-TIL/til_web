import LoginModal from '@/components/Molecules/LoginModal';
import { BACKGROUND_COLOR } from '@/constants/color';
import { css } from '@emotion/react';
import { useState } from 'react';
import Header from '../Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isModal, setIsModal] = useState(true);

  const handleModalToggle = (flag: boolean) => {
    setIsModal(flag);
  };
  return (
    <div
      css={css`
        overflow: hidden;
      `}
    >
      {isModal && <LoginModal onModalOff={handleModalToggle} />}
      <Header onModalOn={handleModalToggle} />
      <main
        css={css`
          padding-top: 80px;
          background-color: ${BACKGROUND_COLOR['NAVY_1']};
          min-height: calc(100vh);
          margin: 0 auto;
        `}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
