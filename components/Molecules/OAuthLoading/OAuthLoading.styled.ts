import { css } from '@emotion/react';

const loadingContainer = css`
  max-width: 328px;
  margin: 0 auto;
  padding: 60px 0;
`;

const spinnerContainer = css`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const loadingGuide = css`
  width: 220px;
  margin: 0 auto;
  padding-top: 52px;
`;

const styles = { loadingContainer, spinnerContainer, loadingGuide };

export default styles;
