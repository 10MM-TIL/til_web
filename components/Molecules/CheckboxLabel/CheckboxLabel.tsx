import React from 'react';
import Checkbox from '@/components/Atom/Checkbox';
import * as Typo from '@/components/Atom/Typography';
import { FONT_COLOR } from '@/constants/color';
import { CheckboxContainer } from './style';

interface CheckboxLabelProps {
  checked: boolean;
  text: string;
  onClick: () => void;
}

const CheckboxLabel = ({ checked, text, onClick }: CheckboxLabelProps) => {
  const handleClick = () => {
    if (onClick) onClick();
  };
  return (
    <CheckboxContainer onClick={handleClick}>
      <Typo.Label2 color={checked ? FONT_COLOR.GRAY_3 : FONT_COLOR.GRAY_2}>{text}</Typo.Label2>
      <Checkbox checked={checked} />
    </CheckboxContainer>
  );
};

export default CheckboxLabel;
