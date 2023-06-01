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
    if (curCategory === 'develop') return '/images/develop_meta.png';
    else if (curCategory === 'design') return '/images/design_meta.png';
    else if (curCategory === 'planning') return '/images/plan_meta.png';
    else if (curCategory === 'marketing') return '/images/market_meta.png';
    else if (curCategory === 'startup') return '/images/startup_meta.png';
    else return '/images/default_meta.png';
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
