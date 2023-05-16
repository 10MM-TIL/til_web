import styled from '@emotion/styled';
import { mq } from '@/styles/mediaQuery';

const SetContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 40px;
  justify-items: center;
  width: 100%;
  padding: 50px 0 62px 0;
  ${mq('desktop')} {
    padding: 36px 0 24px 0;
    row-gap: 28px;
  }
`;

export { SetContainer };
