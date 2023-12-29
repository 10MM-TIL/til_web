import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/apis/user';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AuthState } from '@/stores/authStateStore';
import { clickedGrassDate } from '@/stores/user';

import ToastMessage from '@/components/ToastMessage';
import GrassTemplate from '@/components/Templates/GrassTemplate';
import TimelineTemplate from '@/components/Templates/TimelineTemplate';

import { useMyUser, useUserProfile } from '@/hooks/queries/profileQuery';
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
  const { data: userInfo } = useUserProfile({
    enabled: isLogin && (userData ? userData.path?.length > 0 : false),
    userPath: userData ? userData.path : '',
  });
  return (
    <div css={styles.wrapper}>
      <HomeBanner></HomeBanner>
      <div css={styles.desktopContainer}>
        {
          <>
            <div css={styles.container}>
              <HomeTextArea showToast={showToast} userInfo={userInfo}></HomeTextArea>
              <GrassTemplate
                path={userData?.path || ''}
                title={userData ? `${userData.name}의 기록` : '내가 모은 기록'}
                onClick={(value) => {
                  setClickedDate(value);
                }}
              />
              <TimelineTemplate path={userData ? userData.path : ''} deletable={userInfo?.isAuthorized || false} />
            </div>
            <HomeCard userData={userData}></HomeCard>
          </>
        }
      </div>
      {isToastOpen && <ToastMessage isOpen={isToastOpen}>{toastText}</ToastMessage>}
    </div>
  );
};

export default HomeTemplates;
