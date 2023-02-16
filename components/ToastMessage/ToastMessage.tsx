import React, { ReactNode, useEffect } from 'react';
import { ToastMessageContainer } from './style';

interface ToastProps {
  isOpen: boolean;
  children: ReactNode;
}
const ToastMessage = ({ isOpen, children }: ToastProps) => {
  useEffect(() => {
    console.log('isOpen', isOpen);
  }, [isOpen]);
  return <ToastMessageContainer isOpen={isOpen}>{children}</ToastMessageContainer>;
};

export default ToastMessage;
