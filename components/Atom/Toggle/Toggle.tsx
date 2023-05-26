import { POINT_COLOR } from '@/constants/color';
import { ToggleContainer, ToggleButton } from './style';
import { Label2 } from '@/components/Atom/Typography';

interface ToggleProps {
  isOn: boolean;
  onIsOnToggle: () => void;
}

// Toggle Button => absolute
const Toggle = ({ isOn, onIsOnToggle }: ToggleProps) => {
  return (
    <ToggleContainer onClick={onIsOnToggle}>
      <Label2 color={POINT_COLOR.ERROR}>OFF</Label2>
      <ToggleButton isOn={isOn} />
      <Label2 color={POINT_COLOR.MAIN}>ON</Label2>
    </ToggleContainer>
  );
};

export default Toggle;
