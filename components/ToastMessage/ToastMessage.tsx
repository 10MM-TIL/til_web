import React, { ReactNode, useEffect } from 'react';
import { ToastMessageContainer } from './style';

interface ToastProps {
  isOpen: boolean;
  children: ReactNode;
  isWarning?: boolean;
}
const ToastMessage = ({ isOpen, isWarning = false, children }: ToastProps) => {
  return (
    <ToastMessageContainer isOpen={isOpen} isWarning={isWarning}>
      {children}
    </ToastMessageContainer>
  );
};

export default ToastMessage;
