import SpinnerSvg from 'assets/svgs/Spinner.svg';
import styles from './Spinner.styled';

interface SpinnerProps {
  size?: string;
  delay?: number;
}

const Spinner = ({ size = '100px', delay }: SpinnerProps) => {
  return <SpinnerSvg width={size} height={size} css={styles.spinner({ delay })} />;
};

export default Spinner;
