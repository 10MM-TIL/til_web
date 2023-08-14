import { useSearchParams } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { AuthState } from '@/stores/authStateStore';
import { LoginModalState } from '@/stores/modalStateStore';

import useAuth from '@/hooks/useAuth';
import { useMyUser } from '@/hooks/queries/profileQuery';

import MetaHead, { MetaContents } from '@/components/Atom/MetaHead';
import LoginModal from '@/components/Molecules/LoginModal';
import CategoryModal from '@/components/Molecules/CategoryModal';

import GTMScript from '../GTMScript';
import Header from '../Header';
import styles from './Layout.styled';
import { CategoryQueryKeys } from '@/components/Atom/Card/types';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useAuth();

  const { isLogin } = useRecoilValue(AuthState);
  const { isLoginModalOpen } = useRecoilValue(LoginModalState);
  const searchParams = useSearchParams();
  const { data: userData } = useMyUser({ isLogin });
  const curCategory = (searchParams.get('category') as CategoryQueryKeys) || userData?.categoryIdentifier || 'develop';

  const setMetaImage = (): MetaContents['image'] => {
    if (curCategory === 'develop') return '/develop_meta.png';
    else if (curCategory === 'design') return '/design_meta.png';
    else if (curCategory === 'planning') return '/plan_meta.png';
    else if (curCategory === 'marketing') return '/market_meta.png';
    else if (curCategory === 'company') return '/startup_meta.png';
    else return '/default_meta.png';
  };

  return (
    <>
      <MetaHead metaContents={{ image: setMetaImage() }}></MetaHead>
      <GTMScript />
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
