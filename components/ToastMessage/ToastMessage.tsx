import { ReactNode } from 'react';
import { ToastMessageContainer } from './style';

interface ToastProps {
  isOpen: boolean;
  children: ReactNode;
  isWarning?: boolean;
}
const ToastMessage = ({ isOpen, isWarning = false, children }: ToastProps) => {
  return isOpen ? (
    <ToastMessageContainer isOpen={isOpen} isWarning={isWarning}>
      {children}
    </ToastMessageContainer>
  ) : null;
};

export default ToastMessage;
