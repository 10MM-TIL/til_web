import { SvgProps } from '@/types/svg';

const IconCheckBig = ({ width, height, fill, stroke }: SvgProps) => {
  return (
    <svg
      width={width ?? '14'}
      height={height ?? '14'}
      viewBox='0 0 14 14'
      fill={fill ?? 'none'}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M1.89567 6.99998C1.89567 4.18102 4.18088 1.89581 6.99984 1.89581C9.81879 1.89581 12.104 4.18102 12.104 6.99998C12.104 9.81893 9.81879 12.1041 6.99983 12.1041C4.18088 12.1041 1.89567 9.81893 1.89567 6.99998ZM6.99983 12.8333C3.77817 12.8333 1.1665 10.2216 1.1665 6.99998C1.16651 3.77832 3.77818 1.16664 6.99984 1.16664C10.2215 1.16664 12.8332 3.77832 12.8332 6.99998C12.8332 10.2216 10.2215 12.8333 6.99983 12.8333Z'
        fill={fill ?? '#8BFFFF'}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.88262 5.79947L6.41649 9.26561L4.40869 7.25781L4.92429 6.74221L6.41649 8.23441L9.36702 5.28387L9.88262 5.79947Z'
        fill={fill ?? '#8BFFFF'}
      />
    </svg>
  );
};

export default IconCheckBig;
