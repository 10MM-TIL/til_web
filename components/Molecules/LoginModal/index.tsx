import { IconX } from '@/assets/svgs/iconX';
import { FONT_COLOR } from '@/constants/color';

import * as Typo from '@/components/Atom/Typography';
import IconRocket from '@/assets/svgs/IconRocket';

import Link from 'next/link';
import styles from './LoginModal.styled';
import { IconGoogle } from '@/assets/svgs/IconGoogle';
import { LoginModalState } from '@/stores/modalStateStore';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Modal from '@/components/Atom/Modal';

const LoginModal = ({ closable = true }: { closable?: boolean }) => {
  const GOOGLE_LOGIN_LINK = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID}&access_type=offline&prompt=consent&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;

  const { isLoginModalOpen } = useRecoilValue(LoginModalState);
  const setIsLoginModalOpen = useSetRecoilState(LoginModalState);

  return (
    <Modal
      isOpen={isLoginModalOpen}
      onClose={() => setIsLoginModalOpen({ isLoginModalOpen: false })}
      closable={closable}
    >
      <div css={styles.msgContainer}>
        <Typo.Title color={FONT_COLOR['WHITE']}>로그인하기</Typo.Title>
        <Typo.Body color={FONT_COLOR.GRAY_2}>
          브릭로그를 통해 꾸준한 회고와 기록을 해보세요. <br />
          하루하루 성장하는 나를 만날 수 있을거에요.
        </Typo.Body>
      </div>
      <div css={styles.iconContainer}>
        <IconRocket />
      </div>
      <div css={styles.btnContainer}>
        <Link
          href={GOOGLE_LOGIN_LINK}
          onClick={() => setIsLoginModalOpen({ isLoginModalOpen: false })}
          css={styles.googleBtn}
        >
          <IconGoogle />
          <Typo.H2 color='black'>Google 로그인</Typo.H2>
        </Link>
        {/* 카카오 로그인 추후 도입 여부 결정 */}
      </div>
    </Modal>
  );
};

export default LoginModal;
