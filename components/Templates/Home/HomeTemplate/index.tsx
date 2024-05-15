import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AuthState } from '@/stores/authStateStore';
import { clickedGrassDate } from '@/stores/user';

import ToastMessage from '@/components/ToastMessage';
import GrassTemplate from '@/components/Templates/GrassTemplate';
import TimelineTemplate from '@/components/Templates/TimelineTemplate';

import { useMyUser, useUserProfile } from '@/hooks/queries/profileQuery';
import useToast from '@/hooks/useToast';
import { useResize } from '@/hooks/useResize';

import HomeTextArea from '../HomeTextArea';
import HomeCard from '../HomeCard';

import styles from './styles';

const HomeTemplates = () => {
  const { isOpen: isToastOpen, text: toastText, showToast, isWarning } = useToast();
  const { isLogin } = useRecoilValue(AuthState);
  const setClickedDate = useSetRecoilState(clickedGrassDate);
  const device = useResize();

  const { data: userData } = useMyUser({ isLogin });
  const { data: userInfo } = useUserProfile({
    enabled: isLogin && (userData ? userData.path?.length > 0 : false),
    userPath: userData ? userData.path : '',
  });
  return (
    <div css={styles.wrapper}>
      {/* <HomeBanner />
        운영 중 Banner 제거하는 것으로 컨펌 되어 주석 처리 (추후 사용 가능)
      */}
      <div css={styles.desktopContainer}>
        {
          <>
            <div css={styles.container}>
              {device === 'desktop' && <HomeTextArea showToast={showToast} userInfo={userInfo} />}
              <GrassTemplate
                path={userData?.path || ''}
                title={userData ? `${userData.name}의 기록` : '내가 모은 기록'}
                onClick={(value) => {
                  setClickedDate(value);
                }}
              />
              {device !== 'desktop' && <HomeTextArea showToast={showToast} userInfo={userInfo} />}
              <TimelineTemplate path={userData ? userData.path : ''} deletable={userInfo?.isAuthorized || false} />
            </div>
            <HomeCard userData={userData}></HomeCard>
          </>
        }
      </div>
      {isToastOpen && (
        <ToastMessage isOpen={isToastOpen} isWarning={isWarning}>
          {toastText}
        </ToastMessage>
      )}
    </div>
  );
};

export default HomeTemplates;
