import styled from '@emotion/styled';
import { BACKGROUND_COLOR } from '@/constants/color';

export const BoxLayoutContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 776px;
  min-height: 84px;
  padding: 24px 40px 24px 44px;
  background: ${BACKGROUND_COLOR.NAVY_3};
  border-radius: 12px;

  div {
    word-break: keep-all;
  }

  // TODO 모바일 버전 대응 필요
`;
