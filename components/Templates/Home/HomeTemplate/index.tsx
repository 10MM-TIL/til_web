import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/apis/user';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AuthState } from '@/stores/authStateStore';
import { clickedGrassDate } from '@/stores/user';

import ToastMessage from '@/components/ToastMessage';
import GrassTemplate from '@/components/Templates/GrassTemplate';
import TimelineTemplate from '@/components/Templates/TimelineTemplate';

import { useMyUser } from '@/hooks/queries/profileQuery';
import useToast from '@/hooks/useToast';

import HomeTextArea from '../HomeTextArea';
import HomeCard from '../HomeCard';
import HomeBanner from '../HomeBanner';

import styles from './styles';

const HomeTemplates = () => {
  const { isOpen: isToastOpen, text: toastText, showToast } = useToast();
  const { isLogin } = useRecoilValue(AuthState);
  const setClickedDate = useSetRecoilState(clickedGrassDate);

  const { data: userData } = useMyUser({ isLogin });
  const user = userData?.data;
  const { data: userInfo } = useQuery(['PROFILE', user?.path], () => getUserProfile(user?.path ?? ''), {
    enabled: isLogin,
  });

  return (
    <div css={styles.wrapper}>
      <HomeBanner></HomeBanner>

      <div css={styles.desktopContainer}>
        <div css={styles.container}>
          <HomeTextArea showToast={showToast} userInfo={userInfo}></HomeTextArea>
          <GrassTemplate
            path={user?.path ?? ''}
            title={isLogin ? `${user?.name}의 기록` : '내가 모은 기록'}
            onClick={(value) => {
              setClickedDate(value);
            }}
          />
          <TimelineTemplate path={user?.path ?? ''} changable={userInfo?.isAuthorized} />
        </div>
        <HomeCard></HomeCard>
      </div>
      {isToastOpen && <ToastMessage isOpen={isToastOpen}>{toastText}</ToastMessage>}
    </div>
  );
};

export default HomeTemplates;
