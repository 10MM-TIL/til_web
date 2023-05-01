import LoginModal from '@/components/Molecules/LoginModal';
import { useState } from 'react';

import styles from './Layout.styled';

import { useRecoilValue } from 'recoil';
import { AuthState } from '@/stores/authStateStore';
import Header from '../Header';
import useAuth from '@/hooks/useAuth';
import { useMyUser } from '@/hooks/queries/profileQuery';
import CategoryModal from '@/components/Molecules/CategoryModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useAuth();

  const { isLogin } = useRecoilValue(AuthState);

  const { data } = useMyUser({ isLogin });
  const userData = data?.data;

  const [isModal, setIsModal] = useState(false);

  const handleModalToggle = (flag: boolean) => {
    setIsModal(flag);
  };

  // TODO userData에서 category가 만약 없으면 카테고리 팝업 띄워줌

  return (
    <div css={styles.container}>
      {!isLogin && isModal && <LoginModal onModalOff={handleModalToggle} />}
      {userData && <CategoryModal isOpen={!userData.categoryId} />}
      <Header onModalOn={handleModalToggle} />
      <main css={styles.mainContainer}>{children}</main>
    </div>
  );
};

export default Layout;
