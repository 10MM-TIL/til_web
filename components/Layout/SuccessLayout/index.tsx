import { ReactNode } from 'react';

const SuccessLayout = ({ children, isSuccess }: { children: ReactNode; isSuccess: boolean }) => {
  return <>{isSuccess ? children : null}</>;
};

export default SuccessLayout;
