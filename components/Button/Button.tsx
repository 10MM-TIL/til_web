import styled from '@emotion/styled';
import { CSSProperties } from 'react';

type TypeObjectKey = keyof typeof buttonStyles;
type TypeObject = {
  [K in TypeObjectKey]: {
    width: CSSProperties['width'];
    height: CSSProperties['height'];
    borderRadius: CSSProperties['borderRadius'];
  };
};
interface ButtonLayoutProps {
  types: keyof TypeObject;
  color?: CSSProperties['color'];
  backgroundColor?: CSSProperties['backgroundColor'];
}

const buttonStyles = {
  'x-lg': {
    // 로그인 버튼
    width: '485px',
    height: '62px',
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
  category: {
    // 카테고리 버튼
    width: '56px',
    height: '36px',
    borderRadius: '40px',
  },
};

export const Button = styled.button<ButtonLayoutProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ types }) => buttonStyles[types].width ?? '450px'};
  height: ${({ types }) => buttonStyles[types].height ?? '52px'};
  border-radius: ${({ types }) => buttonStyles[types].borderRadius ?? '12px'};
  background-color: ${({ backgroundColor }) => backgroundColor ?? '#22FFA2'};
  color: ${({ color }) => color ?? 'black'};
`;

// 로그인,
