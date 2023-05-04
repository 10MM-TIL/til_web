import * as Typo from '@/components/Atom/Typography';
// 라디오 만드는 컴포넌트
import Radio from '@/components/Atom/Radio';
import { FONT_COLOR, POINT_COLOR } from '@/constants/color';

interface RadioData {
  name: string;
  identifier: string;
}

interface RadioGroupProps {
  data: RadioData[];
  selectedId: string;
  onClick: (value: string) => void;
}

const RadioGroup = ({ data, selectedId, onClick }: RadioGroupProps) => {
  return (
    <>
      {data.map((value, idx) => (
        <Radio
          type='button'
          key={value.identifier + value.name}
          checked={selectedId === value.identifier}
          onClick={() => onClick(value.identifier)}
        >
          <Typo.Label2 color={selectedId === value.identifier ? POINT_COLOR.MAIN : FONT_COLOR.GRAY_3}>
            {value.name}
          </Typo.Label2>
        </Radio>
      ))}
    </>
  );
};

export default RadioGroup;
