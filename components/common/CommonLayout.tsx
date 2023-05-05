import * as Layout from '@/styles/layout.module';
import { ReactNode } from 'react';

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout.Container>
      <Layout.InnerContent>{children}</Layout.InnerContent>
    </Layout.Container>
  );
};
export default CommonLayout;
