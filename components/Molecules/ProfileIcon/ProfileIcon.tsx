import { useState, useRef, useCallback } from 'react';
import { CircleContainer, EditButton, PhotoAreaWrapper } from './style';
import Image from 'next/image';
import { IconEdit } from '@/assets/svgs/IconEdit';
// import DefaultPhoto from '@/assets/images/default-photo.png';
import { ProfileIconProps } from './types';
import Modal from '@/components/Modal';
import { Button } from '@/components/Atom/Button';
import { POINT_COLOR } from '@/constants/color';
import { H1 } from '@/components/Atom/Typography';
import ProfileImageSet from '@/components/Molecules/ProfileImageSet';

const ProfileIcon = ({ imgUrl = 'default', editable = false, onClick }: ProfileIconProps) => {
  // const [image, setImage] = useState(imgUrl === 'default' ? DefaultPhoto : imgUrl);
  // const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * 사진 변경 로직 추가 및 디자인 픽스 시 modal 컴포넌트의 children 추가 예정
   */
  const handleClickEdit = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleClickClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

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
        <ProfileImageSet />
        <div>
          <Button backgroundColor={POINT_COLOR.MAIN} size='md' textChildren={<H1>확인</H1>} />
          <Button backgroundColor={POINT_COLOR.MAIN} size='md' textChildren={<H1>취소</H1>} />
        </div>
      </Modal>
    </>
  );
};

export default ProfileIcon;
