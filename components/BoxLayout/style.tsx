import styled from '@emotion/styled';
import { BACKGROUND_COLOR } from '@/constants/color';

export const BoxLayoutContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 776px;
  min-height: 84px;
  padding: 24px 40px 24px 44px;
  background: ${BACKGROUND_COLOR.NAVY_3};
  border-radius: 12px;
`;
