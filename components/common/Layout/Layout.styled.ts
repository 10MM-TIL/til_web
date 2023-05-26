import { BACKGROUND_COLOR } from '@/constants/color';
import { css } from '@emotion/react';

const container = css`
  overflow: hidden;
  background-color: ${BACKGROUND_COLOR['NAVY_1']};
`;

const mainContainer = css`
  padding-top: 80px;
  min-height: calc(100vh);
  margin: 0 auto;
  max-width: 1920px;
`;

const styles = { container, mainContainer };

export default styles;
