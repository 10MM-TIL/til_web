import { useEffect, useLayoutEffect, useState } from 'react';

export type device = 'desktop' | 'mobile';
type windowWidth = {
  width: number;
};

export const useResize = () => {
  const [windowSize, setWindowSize] = useState<windowWidth>({
    width: 0,
  });
  const [device, setDevice] = useState<device>('desktop');

  useLayoutEffect(() => {
    setWindowSize({
      width: window.innerWidth,
    });
    if (window.innerWidth < 1194) {
      setDevice('mobile');
    } else setDevice('desktop');
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }
    window.addEventListener('resize', handleResize);

    if (windowSize.width < 1194) {
      setDevice('mobile');
    } else setDevice('desktop');

    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize]);

  return device;
};
