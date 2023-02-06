import React, { useState, useCallback, useRef, useEffect, ReactComponentElement, ReactNode } from 'react';
import { FONT_COLOR } from '@/constants/color';
import { ModalContainer, CloseButton, OutLayer } from './style';
import { H1, Body } from '@/components/Typography';

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
            {closable ? <CloseButton onClick={handleCloseModal} /> : null}
            {children}
          </ModalContainer>
        </>
      ) : null}
    </>
  );
};

export default Modal;
