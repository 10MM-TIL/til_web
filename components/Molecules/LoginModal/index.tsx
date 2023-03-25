import { IconX } from '@/assets/svgs/iconX';
import { BACKGROUND_COLOR, FONT_COLOR } from '@/constants/color';
import { css } from '@emotion/react';

import * as Typo from '@/components/Atom/Typography';
import IconRocket from '@/assets/svgs/IconRocket';
import { GoogleLoginMButton, KakaoLoginMButton } from '../Buttons';
import keyframes from '@/styles/keyframe';

interface LoginModalProps {
  onModalOff: (flag: boolean) => void;
}

const LoginModal = ({ onModalOff }: LoginModalProps) => {
  // TODO desktop, mobile size

  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        background-color: rgba(25, 31, 40, 0.5);
        z-index: 9999; // TODO Z-Index 정리
      `}
    >
      <div
        css={css`
          margin-top: 56px;
          background-color: ${BACKGROUND_COLOR.NAVY_3};
          min-height: calc(100vh - 56px);
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
        `}
      >
        <div
          css={css`
            width: 100%;
            display: flex;
            justify-content: end;
            padding: 24px;
          `}
        >
          <IconX onClick={() => onModalOff(false)} />
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            margin: 0 auto;
            gap: 16px;
          `}
        >
          <Typo.Title color={FONT_COLOR['WHITE']}>로그인하기</Typo.Title>
          <Typo.Body color={FONT_COLOR.GRAY_2}>
            브릭로그를 통해 꾸준한 회고와 기록을 해보세요. <br />
            하루하루 성장하는 나를 만날 수 있을거에요.
          </Typo.Body>
        </div>
        <div
          css={css`
            padding: 60px 0;
            display: flex;
            justify-content: center;
          `}
        >
          <IconRocket />
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
          `}
        >
          <GoogleLoginMButton />
          <KakaoLoginMButton />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
