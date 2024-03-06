import { useState, useRef, ReactNode } from 'react';
import { useRecoilState } from 'recoil';
import { ToastIsOpenState, ToastTextState, ToastWarningState } from '@/stores/toastStateStore';

const useToast = () => {
  const [text, setText] = useRecoilState(ToastTextState);
  const [isOpen, setIsOpen] = useRecoilState(ToastIsOpenState);
  const [isWarning, setIsWarning] = useRecoilState(ToastWarningState);

  const toastTimer = useRef<NodeJS.Timeout>();

  const showToast = (text: ReactNode, warning: boolean) => {
    setIsOpen(true);
    setText(text);
    setIsWarning(warning);
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    const timer = setTimeout(() => {
      setIsOpen(false);
      setText('');
    }, 3000);
    toastTimer.current = timer;
  };

  return { isOpen, text, showToast, isWarning };
};

export default useToast;
