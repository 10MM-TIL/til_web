import LoginModal from '@/components/Molecules/LoginModal';
import { BACKGROUND_COLOR } from '@/constants/color';
import { css } from '@emotion/react';
import { useState } from 'react';

import styles from './Layout.styled';

import { useRecoilValue } from 'recoil';
import { AuthState } from '@/stores/authStateStore';
import Header from '../Header';
import useAuth from '@/hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useAuth();

  const { isLogin } = useRecoilValue(AuthState);

  const [isModal, setIsModal] = useState(false);

  const handleModalToggle = (flag: boolean) => {
    setIsModal(flag);
  };

  return (
    <div css={styles.container}>
      {!isLogin && isModal && <LoginModal onModalOff={handleModalToggle} />}
      <Header onModalOn={handleModalToggle} />
      <main css={styles.mainContainer}>{children}</main>
    </div>
  );
};

export default Layout;
