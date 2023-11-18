import { useEffect, ReactNode, CSSProperties } from 'react';
import { ModalContainer, CloseButton, OutLayer } from './style';
import { IconX } from '@/assets/svgs/iconX';
import { SerializedStyles } from '@emotion/react';

interface ModalProps {
  closable?: boolean;
  isOpen?: boolean;
  isConfirm?: boolean;
  onClose: (e: any) => void;
  children: ReactNode;
}

const Modal = ({ closable = true, isOpen = true, onClose, children, isConfirm = false }: ModalProps) => {
  const handleCloseModal = (e: any) => {
    if (closable && onClose) onClose(e);
  };

  // 외부 화면 스크롤 방지
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  return (
    <>
      {isOpen ? (
        <>
          <OutLayer onClick={handleCloseModal} />
          <ModalContainer isConfirm={isConfirm}>
            {closable ? (
              <CloseButton onClick={handleCloseModal}>
                <IconX onClick={() => {}} />
              </CloseButton>
            ) : null}
            {children}
          </ModalContainer>
        </>
      ) : null}
    </>
  );
};

export default Modal;
