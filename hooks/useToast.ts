import { useState, useRef, ReactNode } from 'react';
import { useRecoilState } from 'recoil';
import { ToastIsOpenState, ToastTextState } from '@/stores/toastStateStore';

const useToast = () => {
  const [text, setText] = useRecoilState(ToastTextState);
  const [isOpen, setIsOpen] = useRecoilState(ToastIsOpenState);

  const toastTimer = useRef<NodeJS.Timeout>();

  const showToast = (text: ReactNode) => {
    setIsOpen(true);
    setText(text);

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    const timer = setTimeout(() => {
      setIsOpen(false);
      setText('');
    }, 3000);
    toastTimer.current = timer;
  };

  return { isOpen, text, showToast };
};

export default useToast;
