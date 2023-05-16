import { css } from '@emotion/react';
import * as React from 'react';

const IconArrow = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width={props.width}
    height={props.height}
    viewBox='0 0 6 10'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    css={css`
      ${props.transform &&
      css`
        transform: ${/deg/.test(props.transform) ? props.transform : props.transform.replace(/\)$/, 'deg)')};
      `}
    `}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M4.80859 10L0 5L4.80859 0L6 1.23883L2.38281 5L6 8.76117L4.80859 10Z'
      fill={props.fill}
    />
  </svg>
);

export default IconArrow;
