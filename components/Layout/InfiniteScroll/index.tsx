import { ReactNode, useEffect, useRef } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { type } from 'os';

const InfiniteScrollLayout = ({
  children,
  intersectCallback,
  isObserve,
}: {
  children: ReactNode;
  intersectCallback: (entry: IntersectionObserverEntry) => void;
  isObserve?: boolean;
}) => {
  const bottom = useRef(null);
  const [observe, unobserve] = useIntersectionObserver(intersectCallback);

  useEffect(() => {
    const optionref = bottom.current;
    if (optionref) {
      console.log('observe');
      observe(optionref);
    }
    return () => {
      if (optionref) unobserve(optionref);
    };
  }, [observe, unobserve]);

  useEffect(() => {
    if (typeof isObserve !== 'boolean') return;
    const optionref = bottom.current;
    if (!isObserve && optionref) {
      console.log('unobserve');
      unobserve(optionref);
    }
  }, [isObserve, unobserve]);

  return (
    <>
      {children}
      <div ref={bottom}></div>
    </>
  );
};
export default InfiniteScrollLayout;
