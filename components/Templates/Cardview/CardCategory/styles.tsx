import styled from '@emotion/styled';

export const CardviewContainer = styled.div`
  padding-top: 114px;
`;

export const CategoryContainer = styled.section`
  display: flex;
  flex-direction: column;
  /* grid-column: span 4 / auto; */
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
