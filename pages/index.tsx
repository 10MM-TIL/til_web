import * as Typo from '@/components/Atom/Typography';
import { css } from '@emotion/react';
import { BACKGROUND_COLOR, FONT_COLOR } from '@/constants/color';
import { useResize } from '@/hooks/useResize';

import { useState } from 'react';
import LoginModal from '@/components/Molecules/LoginModal';

const HomePage = () => {
  // TODO 데스크탑과 모바일 뷰 렌더링 디자인 다름

  const resize = useResize();
  const [isModal, setIsModal] = useState(true);

  return (
    <div
      css={css`
        min-height: 100vh;
        display: flex;
        justify-content: center;
        background-color: ${BACKGROUND_COLOR['NAVY_1']};
        position: relative;
      `}
    >
      {isModal && <LoginModal />}
      <div
        css={css`
          width: 100%;
          text-align: center;
        `}
      >
        <Typo.Title color={FONT_COLOR['WHITE']}>
          꾸준한 회고와 기록을 통해 <br /> 매일 성장하세요
        </Typo.Title>
      </div>
    </div>
  );
};

export default HomePage;
