import { devLogger } from '@/utils/system';
import { useEffect, useRef } from 'react';

let intersectionobserver: IntersectionObserver;
const useIntersectionObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  option?: IntersectionObserverInit,
  isObserve?: boolean,
) => {
  const observerRef = useRef(null);

  useEffect(() => {
    if (intersectionobserver && typeof isObserve === 'boolean' && !isObserve) {
      unobserve();
    } else if (observerRef && observerRef.current) {
      intersectionobserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            unobserve();
            callback(entry);
          }
        });
      }, option);
      observe();
      return () => intersectionobserver.disconnect();
    }
  }, [isObserve, observerRef, option, callback]);

  const observe = () => {
    if (observerRef.current) {
      devLogger('observe');
      intersectionobserver.observe(observerRef.current);
    }
  };

  const unobserve = () => {
    if (observerRef.current) {
      devLogger('unobserve');
      intersectionobserver.unobserve(observerRef.current);
    }
  };

  return observerRef;
};

export default useIntersectionObserver;
