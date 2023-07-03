import Modal from '@/components/Atom/Modal';
import RadioGroup from '@/components/Molecules/RadioGroup';
import Toggle from '@/components/Atom/Toggle';
import CheckboxLabel from '@/components/Molecules/CheckboxLabel';
import { Button } from '@/components/Atom/Button';

import * as Typo from '@/components/Atom/Typography';
import { FONT_COLOR } from '@/constants/color';
import { useResize } from '@/hooks/useResize';
import { FormEventHandler, useState } from 'react';
import styles from './CategoryModal.styled';
import { useCategories } from '@/hooks/queries/categoryQuery';
import { useMyProfileOnboarding } from '@/hooks/queries/profileQuery';
import { useUpdateMyNotification } from '@/hooks/queries/alarmQuery';

interface CategoryModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

const CategoryModal = ({ isOpen, onClose = () => {} }: CategoryModalProps) => {
  const device = useResize();

  const [selectedCategoryId, setSelectedCategoryId] = useState('0ec30e71-38ba-4837-8804-f0e1180c5bf1');
  // const [isAlertAgree, setIsAlertAgree] = useState(true);
  // const [frequency, setFrequency] = useState('');
  const [isReceiveAgree, setIsReceiveAgree] = useState(true);

  const { data: category } = useCategories();
  const { mutateAsync: categoryMutate } = useMyProfileOnboarding();
  // const { mutateAsync: notificationMutate } = useUpdateMyNotification();

  const categoryData = category?.data;

  // const handleIsAlertAgreeToggle = () => {
  //   isAlertAgree && setFrequency('');
  //   setIsAlertAgree((prev) => !prev);
  // };

  const handleIsReceiveAgreeToggle = () => setIsReceiveAgree((prev) => !prev);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (selectedCategoryId === '') {
      alert('분야를 선택해주세요');
      return;
    }

    // if (isAlertAgree && frequency === '') {
    //   alert('알림 주기를 선택해주세요');
    //   return;
    // }

    await categoryMutate({ categoryIdentifier: selectedCategoryId, mailAgreement: isReceiveAgree });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'onboarding_complete',
      category: selectedCategoryId,
      marketing_permission: isReceiveAgree,
    });
    // await notificationMutate({ enable: isAlertAgree, iteration: frequency === '' ? 'NONE' : frequency });
  };

  return (
    <Modal closable={false} isOpen={isOpen} onClose={onClose}>
      <form css={styles.form} onSubmit={handleSubmit}>
        <div css={styles.titleContainer}>
          <Typo.Title color={FONT_COLOR.WHITE} lineHeight={device === 'mobile' ? '24px' : '100%'}>
            관심 카테고리 선택
          </Typo.Title>
          <Typo.Body color={FONT_COLOR.GRAY_2}>내 직군과 관심분야가 비슷한 사람들의 회고를 확인해보세요</Typo.Body>
        </div>
        <div css={styles.categoryContainer}>
          <Typo.H1 color={FONT_COLOR.WHITE}>분야</Typo.H1>
          <div css={styles.categoryRadioContainer}>
            <RadioGroup
              data={categoryData?.categories ?? []}
              selectedId={selectedCategoryId}
              onClick={setSelectedCategoryId}
            />
          </div>
        </div>
        {/* <div css={styles.alertContainer}>
          <Typo.H1 color={FONT_COLOR.WHITE}>알림설정</Typo.H1>
          <div css={styles.alertRadioContainer}>
            <Toggle isOn={isAlertAgree} onIsOnToggle={handleIsAlertAgreeToggle} />
            <div css={styles.alertRadioRow}>
              <RadioGroup
                data={[
                  { identifier: 'MONTH', name: '매달' },
                  { identifier: 'WEEK', name: '매주' },
                  { identifier: 'DAY', name: '매일' },
                ]}
                selectedId={frequency}
                onClick={(value) => {
                  isAlertAgree && setFrequency(value);
                }}
              />
            </div>
          </div>
        </div> */}
        <div css={styles.agreeContainer}>
          <CheckboxLabel
            text='마케팅 활용 및 뉴스레터 수신 동의'
            checked={isReceiveAgree}
            onClick={handleIsReceiveAgreeToggle}
          />
          <Typo.Label2 color={FONT_COLOR.GRAY_2}>브릭로그와 관련된 유용한 정보를 받아보실 수 있습니다.</Typo.Label2>
        </div>
        <Button size={device === 'mobile' ? 'x-lg-m' : 'lg'}>
          <Typo.H2 color={'black'}>선택 완료</Typo.H2>
        </Button>
      </form>
    </Modal>
  );
};

export default CategoryModal;
