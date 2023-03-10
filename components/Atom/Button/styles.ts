import styled from '@emotion/styled';
import { CSSProperties } from 'react';
import { ButtonLayoutProps } from './types';
import { buttonStyles } from './Button';

export const ButtonWrapper = styled.button<ButtonLayoutProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ types }) => buttonStyles[types].width ?? '450px'};
  height: ${({ types }) => buttonStyles[types].height ?? '52px'};
  border-radius: ${({ types }) => buttonStyles[types].borderRadius ?? '12px'};
  background-color: ${({ backgroundColor }) => backgroundColor ?? '#22FFA2'};
  color: ${({ color }) => color ?? 'black'};
`;

export const ButtonContent = styled.div<{ gap: CSSProperties['gap'] }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ gap }) => gap};
`;
