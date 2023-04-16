import LoginModal from '@/components/Molecules/LoginModal';
import { BACKGROUND_COLOR } from '@/constants/color';
import { css } from '@emotion/react';
import { useState } from 'react';
import Header from '../Header';
import styles from './Layout.styled';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isModal, setIsModal] = useState(false);

  const handleModalToggle = (flag: boolean) => {
    setIsModal(flag);
  };

  return (
    <div css={styles.container}>
      {isModal && <LoginModal onModalOff={handleModalToggle} />}
      <Header onModalOn={handleModalToggle} />
      <main css={styles.mainContainer}>{children}</main>
    </div>
  );
};

export default Layout;
