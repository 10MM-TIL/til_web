import { useEffect, useRef } from 'react';

const useIntersectionObserver = <T extends HTMLElement>(

  callback: (entry: IntersectionObserverEntry) => void,
  option: IntersectionObserverInit | undefined = { threshold: 1 },
) => {
  const observer = useRef<IntersectionObserver>();
  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        (() => callback(entry))();
        // if (entry.isIntersecting) {
        //   callback();
        // }
      });
    }, option);
  }, [callback, option]);

  const observe = (element: T) => {
    observer.current?.observe(element);
  };

  const unobserve = (element: T) => {
    observer.current?.unobserve(element);
  };

  return [observe, unobserve];
};

export default useIntersectionObserver;

