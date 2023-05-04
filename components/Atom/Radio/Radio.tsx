import { FONT_COLOR, POINT_COLOR } from '@/constants/color';
import styled from '@emotion/styled';

interface RadioProps {
  checked?: boolean;
}

export const Radio = styled.button<RadioProps>`
  height: 36px;
  border-radius: 40px;
  padding: 0 14px;
  color: ${(props) => (props.checked ? POINT_COLOR['MAIN'] : FONT_COLOR['GRAY_3'])};
  background-color: ${(props) => (props.checked ? 'rgba(255, 255, 255, 0.1)' : 'transparent')};
`;
