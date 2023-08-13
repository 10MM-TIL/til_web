import { ReactNode, useEffect, useRef } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

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
    if (!optionref) return;
    observe(optionref);

    if (typeof isObserve === 'boolean' && !isObserve) {
      unobserve(optionref);
    }

    return () => {
      unobserve(optionref);
    };
  }, [isObserve, observe, unobserve]);

  return (
    <>
      {children}
      <div ref={bottom}></div>
    </>
  );
};
export default InfiniteScrollLayout;
