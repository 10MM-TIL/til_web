import styled from '@emotion/styled';
import { mq } from '@/styles/mediaQuery';
import { POINT_COLOR } from '@/constants/color';

const ImageContainer = styled.div<{ selected: boolean }>`
  width: 70px;
  height: 70px;
  border-radius: 100%;
  overflow: hidden;
  cursor: pointer;
  /* background: opacity(0); */
  opacity: ${(props) => (props.selected ? 1 : 0.6)};
  /* background: linear(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)); */
  /* linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)); */
  border: ${(props) => (props.selected ? '3px solid ' + POINT_COLOR['MAIN'] : '')};
  ${mq('desktop')} {
    width: 100px;
    height: 100px;
  }
`;

export { ImageContainer };
