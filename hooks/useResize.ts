import { useEffect, useState } from 'react';

export type device = 'desktop' | 'mobile';

export const useResize = () => {
  const [device, setDevice] = useState<device>('desktop');

  useEffect(() => {
    if (window.innerWidth < 1194) {
      setDevice('mobile');
    } else setDevice('desktop');
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1194) {
        setDevice('mobile');
      } else setDevice('desktop');
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return device;
};
