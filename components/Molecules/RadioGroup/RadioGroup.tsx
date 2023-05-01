import * as Typo from '@/components/Atom/Typography';
// 라디오 만드는 컴포넌트
import Radio from '@/components/Atom/Radio';
import { FONT_COLOR, POINT_COLOR } from '@/constants/color';

interface RadioData {
  text: string;
  id: number;
}

interface RadioGroupProps {
  data: RadioData[];
  selectedId: number;
  onClick: (value: number) => void;
}

const RadioGroup = ({ data, selectedId, onClick }: RadioGroupProps) => {
  return (
    <>
      {data.map((value, idx) => (
        <Radio
          type='button'
          key={value.id + value.text}
          checked={selectedId === value.id}
          onClick={() => onClick(value.id)}
        >
          <Typo.Label2 color={selectedId === value.id ? POINT_COLOR.MAIN : FONT_COLOR.GRAY_3}>{value.text}</Typo.Label2>
        </Radio>
      ))}
    </>
  );
};

export default RadioGroup;
