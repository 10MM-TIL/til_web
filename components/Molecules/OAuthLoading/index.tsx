import Spinner from '@/components/Atom/Spinner';

import * as Typo from '@/components/Atom/Typography';
import { FONT_COLOR } from '@/constants/color';
import styles from './OAuthLoading.styled';

const OAuthLoading = () => {
  return (
    <div css={styles.loadingContainer}>
      <div css={styles.spinnerContainer}>
        <Spinner size='46px' />
        <Typo.Body color={FONT_COLOR.WHITE}>로그인 중입니다.</Typo.Body>
      </div>
    </div>
  );
};

export default OAuthLoading;
