import React, { useState, useCallback, useMemo } from 'react';
import { POINT_COLOR } from '@/constants/color';
import { ToggleContainer, ToggleButton } from './style';
import { Label2 } from '@/components/Atom/Typography';

// Toggle Button => absolute
const Toggle = () => {
  const [isOn, setIsOn] = useState(false);
  const handleClick = useCallback(() => setIsOn((prev) => !prev), []);

  return (
    <ToggleContainer onClick={handleClick}>
      <Label2 color={POINT_COLOR.ERROR}>OFF</Label2>
      <ToggleButton isOn={isOn} />
      <Label2 color={POINT_COLOR.MAIN}>ON</Label2>
    </ToggleContainer>
  );
};

export default Toggle;
