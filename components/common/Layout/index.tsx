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
import MetaHead, { MetaContents } from '@/components/Atom/MetaHead';
import { currentCategoryState } from '@/stores/cardviewStateStore';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useAuth();

  const { isLogin } = useRecoilValue(AuthState);
  const { isLoginModalOpen } = useRecoilValue(LoginModalState);
  const curCategory = useRecoilValue(currentCategoryState);

  const { data } = useMyUser({ isLogin });
  const userData = data?.data;

  const setMetaImage = (): MetaContents['image'] => {
    if (curCategory === 'develop') return '/develop_meta.png';
    else if (curCategory === 'design') return '/design_meta.png';
    else if (curCategory === 'planning') return '/plan_meta.png';
    else if (curCategory === 'marketing') return '/market_meta.png';
    else if (curCategory === 'startup') return '/startup_meta.png';
    else return '/default_meta.png';
  };

  return (
    <>
      <MetaHead metaContents={{ image: setMetaImage() }}></MetaHead>
      <div css={styles.container}>
        {!isLogin && isLoginModalOpen && <LoginModal />}
        {userData && <CategoryModal isOpen={userData.categoryIdentifier === null} />}
        <Header />
        <main css={styles.mainContainer}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
