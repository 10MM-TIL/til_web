import { css } from '@emotion/react';

interface SvgProps {
  fill?: string;
  stroke?: string;
  onClick: () => void;
}

export const IconX = ({ fill, stroke, onClick }: SvgProps) => {
  return (
    <svg
      width='24'
      height='25'
      viewBox='0 0 24 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      css={css`
        cursor: pointer;
      `}
      onClick={onClick}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11.1163 12.5L5.90144 7.28509L6.78532 6.4012L12.0002 11.6161L17.2151 6.4012L18.099 7.28509L12.8841 12.5L18.099 17.7149L17.2151 18.5988L12.0002 13.3839L6.78532 18.5988L5.90144 17.7149L11.1163 12.5Z'
        fill={fill ?? 'white'}
        stroke={stroke ?? 'white'}
        strokeWidth='0.5'
      />
    </svg>
  );
};
