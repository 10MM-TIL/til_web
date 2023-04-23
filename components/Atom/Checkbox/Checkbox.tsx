import { IconChecked } from '@/assets/svgs/IconChecked';
import { IconNotChecked } from '@/assets/svgs/IconNotChecked';

interface CheckboxProps {
  checked: boolean;
}

const Checkbox = ({ checked }: CheckboxProps) => {
  return checked ? <IconChecked /> : <IconNotChecked />;
};

export default Checkbox;
