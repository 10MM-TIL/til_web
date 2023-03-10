import * as Typo from '@/components/Typography';
import { css } from '@emotion/react';
import { BACKGROUND_COLOR, FONT_COLOR } from '@/constants/color';

const HomePage = () => {
  return (
    <div
      css={css`
        min-height: 100%;
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
  );
};

export default HomePage;
