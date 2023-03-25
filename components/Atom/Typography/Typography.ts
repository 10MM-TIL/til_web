import styled from '@emotion/styled';
import { CSSProperties } from 'react';

export interface TypographProps {
  color?: CSSProperties['color'];
}

export const Title = styled.h1<TypographProps>`
  font-size: 26px;
  font-weight: 700;
  line-height: 39px;
  color: ${({ color }) => color ?? 'black'};
`;

export const H1 = styled.h1<TypographProps>`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: ${({ color }) => color ?? 'black'};
`;

export const H2 = styled.h2<TypographProps>`
  font-size: 15px;
  font-weight: 700;
  line-height: 24px;
  color: ${({ color }) => color ?? 'black'};
`;

export const SubHeader = styled.p<TypographProps>`
  font-size: 14px;
  font-weight: 700;
  line-height: 26px;
  color: ${({ color }) => color ?? 'black'};
`;

export const Body = styled.p<TypographProps>`
  font-size: 14px;
  line-height: 22px;
  color: ${({ color }) => color ?? 'black'};
`;

export const Label1 = styled.span<TypographProps>`
  font-size: 13px;
  line-height: 16px;
  color: ${({ color }) => color ?? 'black'};
`;

export const Label2 = styled.span<TypographProps>`
  font-size: 12px;
  line-height: 16px;
  color: ${({ color }) => color ?? 'black'};
`;
