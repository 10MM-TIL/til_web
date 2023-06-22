import styled from '@emotion/styled';
import { mq } from './mediaQuery';

export const Custom404Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 52px;
`;

export const ImageContainer = styled.div`
  padding-top: 50px;
  ${mq('desktop')} {
    padding-top: 130px;
  }
`;

export const TextContainer = styled.div`
  text-align: center;
  padding-top: 72px;
  padding-bottom: 52px;
  & > h1 {
    line-height: 150%;
    white-space: pre-line;
  }
`;
