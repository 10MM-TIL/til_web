import LoginModal from '@/components/Molecules/LoginModal';
import { useState } from 'react';

import styles from './Layout.styled';

import { useRecoilValue } from 'recoil';
import { AuthState } from '@/stores/authStateStore';
import Header from '../Header';
import useAuth from '@/hooks/useAuth';
import { useMyUser } from '@/hooks/queries/profileQuery';
import CategoryModal from '@/components/Molecules/CategoryModal';
import { LoginModalState } from '@/stores/modalStateStore';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useAuth();

  const { isLogin } = useRecoilValue(AuthState);
  const { isLoginModalOpen } = useRecoilValue(LoginModalState);

  const { data } = useMyUser({ isLogin });
  const userData = data?.data;

  return (
    <div css={styles.container}>
      {!isLogin && isLoginModalOpen && <LoginModal />}
      {userData && <CategoryModal isOpen={userData.categoryIdentifier === null} />}
      <Header />
      <main css={styles.mainContainer}>{children}</main>
    </div>
  );
};

export default Layout;
