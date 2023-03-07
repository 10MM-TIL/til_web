import { useEffect, ReactNode } from 'react';
import { ModalContainer, CloseButton, OutLayer } from './style';
import { IconX } from '@/assets/svgs/iconX';

interface ModalProps {
  closable?: boolean;
  isOpen?: boolean;
  onClose: (e: any) => void;
  children: ReactNode;
}

const Modal = ({ closable = true, isOpen = true, onClose, children }: ModalProps) => {
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
          <ModalContainer>
            {closable ? (
              <CloseButton onClick={handleCloseModal}>
                <IconX />
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
