import { useState, useRef, useCallback } from 'react';
import { CircleContainer, EditButton, PhotoAreaWrapper, ModalContentsContainer } from './style';
import Image from 'next/image';
import { IconEdit } from '@/assets/svgs/IconEdit';
// import DefaultPhoto from '@/assets/images/default-photo.png';
import { ProfileIconProps } from './types';
import Modal from '@/components/Modal';
import { Button } from '@/components/Atom/Button';
import { FONT_COLOR, POINT_COLOR } from '@/constants/color';
import { Body, H1, Title } from '@/components/Atom/Typography';
import ProfileImageSet from '@/components/Molecules/ProfileImageSet';

const ProfileIcon = ({ imgUrl, editable = false, onClick }: ProfileIconProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectdId, setSelectedId] = useState(1);
  /**
   * 사진 변경 로직 추가 및 디자인 픽스 시 modal 컴포넌트의 children 추가 예정
   */
  const handleClickEdit = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleClickClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleClickOk = useCallback(() => {
    onClick(selectdId);
    setIsModalOpen(false);
  }, [onClick, selectdId]);

  return (
    <>
      <PhotoAreaWrapper editable={editable}>
        <CircleContainer editable={editable}>
          <Image alt='profile' src={imgUrl} width={200} height={200} />
        </CircleContainer>
        {editable ? (
          <EditButton onClick={handleClickEdit}>
            <IconEdit />
          </EditButton>
        ) : null}
      </PhotoAreaWrapper>
      <Modal closable={true} isOpen={isModalOpen} onClose={handleClickClose}>
        <ModalContentsContainer>
          <Title color={FONT_COLOR.WHITE}>프로필 설정</Title>
          <Body color={FONT_COLOR.GRAY_2}>브릭로그에서 사용할 프로필을 선택해 주세요.</Body>
          <ProfileImageSet
            id={selectdId}
            onClick={(id) => {
              setSelectedId(id);
            }}
          />
          <div>
            <Button backgroundColor={POINT_COLOR.MAIN} size='lg' onClick={handleClickOk}>
              <H1>설정 완료</H1>
            </Button>
          </div>
        </ModalContentsContainer>
      </Modal>
    </>
  );
};

export default ProfileIcon;
