import { SvgProps } from '@/types/svg';

const IconSaving = ({ width, height, fill, stroke }: SvgProps) => {
  return (
    <svg
      width={width ?? '24'}
      height={height ?? '24'}
      viewBox='0 0 24 24'
      fill={fill ?? 'none'}
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='7.26923' cy='12.2692' r='1.26923' fill={fill ?? '#8BFFFF'} />
      <circle cx='11.8083' cy='12.2692' r='1.26923' fill={fill ?? '#8BFFFF'} />
      <circle cx='16.3474' cy='12.2692' r='1.26923' fill={fill ?? '#8BFFFF'} />
    </svg>
  );
};

export default IconSaving;
