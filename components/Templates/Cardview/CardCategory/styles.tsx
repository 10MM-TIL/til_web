import { mq } from '@/styles/mediaQuery';
import styled from '@emotion/styled';

export const CardviewContainer = styled.div`
  padding-top: 114px;
`;

export const CategoryContainer = styled.section`
  display: flex;
  flex-direction: column;
  grid-column: span 1 / auto;
  @media screen and (min-width: 780px) {
    grid-column: span 6 / auto;
  }
  ${mq('desktop')} {
    grid-column: span 6 / auto;
  }
`;
export const CategoryHeader = styled.div`
  margin-bottom: 20px;
`;
export const CategoryContent = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 28px; // 태블릿
  flex-wrap: wrap;
  button {
    min-width: 56px;
  }
`;
