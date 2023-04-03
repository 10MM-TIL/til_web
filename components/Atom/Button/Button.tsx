import * as Styled from './styles';
import { ButtonProps } from './types';
import { POINT_COLOR } from '@/constants/color';

export const buttonStyles = {
  'x-lg': {
    // 로그인 버튼
    width: '485px',
    height: '62px',
    borderRadius: '12px',
  },
  'x-lg-m': {
    width: '328px',
    height: '52px',
    borderRadius: '12px',
  },
  lg: {
    // 큰 버튼
    width: '450px',
    height: '52px',
    borderRadius: '12px',
  },
  md: {
    // 중간 버튼
    width: '107px',
    height: '36px',
    borderRadius: '8px',
  },
  sm: {
    // 작은 버튼
    width: '76px',
    height: '36px',
    borderRadius: '8px',
  },
  float: {
    // 플로팅 버튼
    width: '68px',
    height: '68px',
    borderRadius: '50%',
  },
};

export const Button = ({
  size = 'sm',
  backgroundColor = POINT_COLOR.MAIN,
  gap = '0px',
  svg,
  textChildren,
}: ButtonProps) => {
  return (
    <Styled.ButtonWrapper types={size} backgroundColor={backgroundColor}>
      <Styled.ButtonContent gap={gap}>
        {svg && svg}
        {textChildren && textChildren}
      </Styled.ButtonContent>
    </Styled.ButtonWrapper>
  );
};
// 로그인,
