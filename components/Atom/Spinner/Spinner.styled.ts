import { css } from '@emotion/react';

const spinner = ({ delay }: { delay?: number }) => css`
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  animation: rotate ${delay ?? 0.6}s linear infinite;
`;

const styles = { spinner };

export default styles;
