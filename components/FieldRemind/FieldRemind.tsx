import { ReactElement, forwardRef, ForwardedRef, MouseEvent, memo, useCallback } from 'react';
import {
  FieldRemindContainer,
  FieldRemindDate,
  FieldRemindDesc,
  FieldRemindCopyContainer,
  FieldRemindCopy,
  FieldRemindDatePickerWrapper,
  FieldRemindTitleInput,
  CopyIcon,
  CalendarIcon,
} from './styles';
import * as Typo from '@/components/Typography';
import { FieldRemindProps, FieldRemindPropsForDatepicker } from './types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { FONT_COLOR } from '@/constants/color';

const DATE_FORMAT = 'yyyy.MM.dd';

// TODO 데이트 피커 커스텀 필요
const CustomDatePicker = memo(function CustomDatePicker({
  type,
  date,
  onDateChange,
}: Omit<FieldRemindPropsForDatepicker, 'title' | 'onTitleChange'>) {
  const ExampleCustomInput = forwardRef(
    (
      { value = '', onClick }: { value?: string; onClick?: (event: MouseEvent<HTMLDivElement>) => void },
      ref: ForwardedRef<HTMLDivElement>,
    ) => (
      <FieldRemindDatePickerWrapper onClick={onClick} ref={ref}>
        <FieldRemindDate type={type}>
          <Typo.Label1 color={FONT_COLOR.GRAY_2}>{value ? value : '날짜를 입력해주세요.'}</Typo.Label1>
        </FieldRemindDate>
        <CalendarIcon />
      </FieldRemindDatePickerWrapper>
    ),
  );
  ExampleCustomInput.displayName = 'ExampleCustomInput';
  // Component definition is missing display name react/display-name
  // eslint에서 오는 오류로 이름이 없으면 리턴되는 인풋(사진)값만을 출력하기 때문에 디버깅이 어려워진다.
  // 따라서 출력될 이름을 주면 해결된다.

  return (
    <DatePicker
      locale={ko}
      selected={date}
      dateFormat={DATE_FORMAT}
      showPopperArrow={false} // 화살표 변경
      onChange={(date) => onDateChange(date)}
      customInput={<ExampleCustomInput />}
      peekNextMonth
      showYearDropdown
      showMonthDropdown
      dropdownMode='scroll'
    />
  );
});

const FieldRemind = (props: FieldRemindProps): ReactElement => {
  const CopyBtn = () => {
    return (
      <FieldRemindCopyContainer onClick={props.onClickCopy}>
        <FieldRemindCopy>
          <CopyIcon></CopyIcon>
        </FieldRemindCopy>
      </FieldRemindCopyContainer>
    );
  };

  return (
    <FieldRemindContainer>
      <div>
        {props.type === 'date' ? (
          <>
            <FieldRemindDate>
              <Typo.Label1 color={FONT_COLOR.GRAY_2}>{props.date}</Typo.Label1>
            </FieldRemindDate>
            <FieldRemindDesc>
              <Typo.SubHeader color={FONT_COLOR.GRAY_4}>{props.desc}</Typo.SubHeader>
            </FieldRemindDesc>
          </>
        ) : (
          <>
            <CustomDatePicker type={props.type} date={props.date} onDateChange={props.onDateChange}></CustomDatePicker>
            {/* [TODO} maxLength 정하기 필요 */}
            <FieldRemindTitleInput
              key='datepicker'
              type='text'
              placeholder='제목을 입력해주세요'
              value={props.title}
              onChange={props.onTitleChange}
              maxLength={200}
            />
          </>
        )}
      </div>
      <CopyBtn></CopyBtn>
    </FieldRemindContainer>
  );
};
export default memo(FieldRemind);
