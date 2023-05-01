import styled from '@emotion/styled';
import { CSSProperties } from 'react';

export interface TypographProps {
  color?: CSSProperties['color'];
}

export const Title = styled.h1<TypographProps>`
  font-size: 28px;
  font-weight: 700;
  line-height: 24px;
  color: ${({ color }) => color ?? 'white'};
`;

export const H1 = styled.h1<TypographProps>`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: ${({ color }) => color ?? 'white'};
`;

export const H2 = styled.h2<TypographProps>`
  font-size: 15px;
  font-weight: 700;
  line-height: 24px;
  color: ${({ color }) => color ?? 'white'};
`;

export const SubHeader = styled.p<TypographProps>`
  font-size: 14px;
  font-weight: 700;
  line-height: 26px;
  color: ${({ color }) => color ?? 'white'};
`;

export const Body = styled.p<TypographProps>`
  font-size: 14px;
  line-height: 22px;
  color: ${({ color }) => color ?? 'white'};
`;

export const Label1 = styled.span<TypographProps>`
  font-size: 13px;
  line-height: 16px;
  color: ${({ color }) => color ?? 'white'};
`;

export const Label2 = styled.span<TypographProps>`
  font-size: 12px;
  line-height: 16px;
  color: ${({ color }) => color ?? 'white'};
`;
