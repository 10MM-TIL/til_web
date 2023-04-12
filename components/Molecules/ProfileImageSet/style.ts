import styled from '@emotion/styled';
import { mq } from '@/styles/mediaQuery';

const SetContainer = styled.div`
  // style 추가작업 필요
  display: flex;
  width: 326px;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 10px;
  ${mq('desktop')} {
    width: 471px;
  }
`;

export { SetContainer };
