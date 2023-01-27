import { useRef, useEffect, MouseEvent, RefObject, useCallback } from 'react';

export const useOutSideRef = <T extends HTMLElement>(callback: Function): RefObject<T> => {
  const ref = useRef<T>(null);

  const handleClickOutside = useCallback(
    (event: CustomEvent<MouseEvent<T>>) => {
      // 현재 document에서 mousedown 이벤트가 동작하면 호출되는 함수입니다.
      if (event.target instanceof HTMLElement && ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    },
    [callback],
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside as EventListener);
    return () => {
      document.removeEventListener('click', handleClickOutside as EventListener);
    };
  }, [handleClickOutside]);

  return ref;
};
