import React, { ReactNode } from 'react';
import { TootlipContainer, ContentContainer, Direction, CloseButton } from './style';
import { Label1 } from '@/components/Typography';
import { TooltipProps } from './types';

const Tooltip = ({ children, text, leftPixel }: TooltipProps) => {
  return (
    <>
      <>{children}</>
      <TootlipContainer leftPixel={leftPixel}>
        <CloseButton />
        <ContentContainer>
          <Label1>{text}</Label1>
        </ContentContainer>
        <Direction />
      </TootlipContainer>
    </>
  );
};

export default Tooltip;
