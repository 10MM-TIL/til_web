import { he } from 'date-fns/locale';

export const IconPlus = ({
  fill,
  stroke,
  width = '16',
  height = '16',
}: {
  fill?: string;
  stroke?: string;
  width?: string;
  height?: string;
}) => {
  return (
    <svg width={width} height={height} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.47933 9.47918V3.33334H10.521V9.47918H16.6668V10.5208H10.521V16.6667H9.47933V10.5208H3.3335V9.47918H9.47933Z'
        fill={fill ?? '#343B43'}
        stroke={stroke ?? '#343B43'}
        strokeWidth='0.416667'
      />
    </svg>
  );
};
