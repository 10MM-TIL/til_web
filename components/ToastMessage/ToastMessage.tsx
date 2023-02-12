import React, { ReactNode } from 'react';
import { ToastMessageContainer } from './style';

interface ToastProps {
  children: ReactNode;
}
const ToastMessage = ({ children }: ToastProps) => {
  return <ToastMessageContainer>{children}</ToastMessageContainer>;
};

export default ToastMessage;
