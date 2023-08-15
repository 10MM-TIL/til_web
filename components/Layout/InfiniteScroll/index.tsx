import { ReactNode, useEffect, useRef } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const InfiniteScrollLayout = ({
  children,
  intersectCallback,
  isObserve,
  option,
}: {
  children: ReactNode;
  intersectCallback: (entry: IntersectionObserverEntry) => void;
  isObserve?: boolean;
  option?: IntersectionObserverInit;
}) => {
  // const bottom = useRef(null);
  const observerRef = useIntersectionObserver(intersectCallback, option, isObserve);

  return (
    <>
      {children}
      <div ref={observerRef}></div>
    </>
  );
};
export default InfiniteScrollLayout;
