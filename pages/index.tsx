import * as Typo from '@/components/Atom/Typography';
import { css } from '@emotion/react';
import { BACKGROUND_COLOR, FONT_COLOR } from '@/constants/color';
import { useResize } from '@/hooks/useResize';
import { IconX } from '@/assets/svgs/iconX';
import IconRocket from '@/assets/svgs/IconRocket';
import { GoogleLoginMButton, KakaoLoginMButton } from '@/components/Molecules/Buttons';

const HomePage = () => {
  const resize = useResize();

  return (
    <>
      {resize === 'desktop' ? (
        <div
          css={css`
            min-height: 100vh;
            display: flex;
            justify-content: center;
            background-color: ${BACKGROUND_COLOR['NAVY_1']};
          `}
        >
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
      ) : (
        <div
          css={css`
            width: 100%;
            min-height: 100vh;
            background-color: ${BACKGROUND_COLOR['NAVY_1']};
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
            <IconX />
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
      )}
    </>
  );
};

export default HomePage;
