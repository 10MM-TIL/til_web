import styled from '@emotion/styled';
import { mq } from './mediaQuery';

export const Custom404Wrapper = styled.div`
  /* position: relative; */
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageContainer = styled.div`
  /* text-align: center; */
  /* position: absolute;
  left: 50%;
  transform: translateX(-50%); */
  /* height: 152px;
  width: 259px; */
  padding-top: 50px;
  ${mq('desktop')} {
    /* height: 253px;
    width: 427px; */
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
