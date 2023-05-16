import { useState, useRef, ReactNode } from 'react';

const useToast = () => {
  const [text, setText] = useState<ReactNode>('');
  const [isOpen, setIsOpen] = useState(false);
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
