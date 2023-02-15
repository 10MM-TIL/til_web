import styled from '@emotion/styled';
import { BACKGROUND_COLOR } from '@/constants/color';

export const GrassAreaContainer = styled.div`
  padding-top: 44px;
  margin: 0 auto;
  max-width: 337px;
  height: 100%;
  background-color: ${BACKGROUND_COLOR.NAVY_1};

  @media screen and (min-width: 1194px) {
    max-width: 780px;
    padding-top: 40px;
  }
`;
