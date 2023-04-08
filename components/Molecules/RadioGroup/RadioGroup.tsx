// 라디오 만드는 컴포넌트
import Radio from '@/components/Atom/Radio';

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
        <Radio key={value.id + value.text} checked={selectedId === value.id} onClick={() => onClick(value.id)}>
          {value.text}
        </Radio>
      ))}
    </>
  );
};

export default RadioGroup;
