import { ReactElement, forwardRef, ForwardedRef, MouseEvent, memo, useRef, useState, ChangeEvent } from 'react';
import * as Styled from './styles';
import * as Typo from '@/components/Typography';
import { FieldRemindProps, FieldRemindPropsForDatepicker } from './types';
import { css } from '@emotion/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { FONT_COLOR } from '@/constants/color';
import { IconLinkCopy } from '@/assets/svgs/IconLinkCopy';
import { IconCalendar } from '@/assets/svgs/IconCalendar';

const DATE_FORMAT = 'yyyy.MM.dd';

// TODO 데이트 피커 커스텀 필요
const CustomDatePicker = memo(function CustomDatePicker({
  type,
  date,
  onDateChange,
}: Pick<FieldRemindPropsForDatepicker, 'date' | 'onDateChange' | 'type'>) {
  const ExampleCustomInput = forwardRef(
    (
      { value = '', onClick }: { value?: string; onClick?: (event: MouseEvent<HTMLDivElement>) => void },
      ref: ForwardedRef<HTMLDivElement>,
    ) => (
      <Styled.FieldRemindDatePickerWrapper onClick={onClick} ref={ref}>
        <Styled.FieldRemindDate type={type}>
          <Typo.Label1 color={FONT_COLOR.GRAY_2}>{value ? value : '날짜를 입력해주세요.'}</Typo.Label1>
        </Styled.FieldRemindDate>
        <Styled.CalendarIcon>
          <IconCalendar></IconCalendar>
        </Styled.CalendarIcon>
      </Styled.FieldRemindDatePickerWrapper>
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

const FieldRemindTitleInput = memo(function FieldRemindTitleInput({
  title,
  onTitleChange,
}: {
  title: string;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const [titleFocus, setTitleFocus] = useState(false);

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 6px;
      `}
    >
      <Styled.FieldRemindInput
        ref={titleRef}
        type='text'
        placeholder='제목을 입력해주세요'
        value={title}
        onChange={onTitleChange}
        onFocus={() => setTitleFocus(true)}
        onBlur={() => setTitleFocus(false)}
        maxLength={200}
      />
      <Typo.Label2 color={FONT_COLOR.GRAY_2}>
        {titleFocus ? `${title.length} / ${titleRef.current?.maxLength}` : ''}
      </Typo.Label2>
    </div>
  );
});

const FieldRemindDescInput = memo(function FieldRemindDescInput({
  desc,
  onDescChange,
}: {
  desc: string;
  onDescChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const descRef = useRef<HTMLInputElement>(null);
  const [descFocus, setDescFocus] = useState(false);
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 6px;
      `}
    >
      <Styled.FieldRemindInput
        ref={descRef}
        type='text'
        placeholder='내용을 입력해주세요'
        value={desc}
        onChange={onDescChange}
        onFocus={() => setDescFocus(true)}
        onBlur={() => setDescFocus(false)}
        maxLength={200}
      />
      <Typo.Label2 color={FONT_COLOR.GRAY_2}>
        {descFocus ? `${desc.length} / ${descRef.current?.maxLength}` : ''}
      </Typo.Label2>
    </div>
  );
});

const FieldRemind = (props: FieldRemindProps): ReactElement => {
  const CopyBtn = () => {
    return (
      <Styled.FieldRemindCopyContainer onClick={props.onClickCopy}>
        <Styled.FieldRemindCopy>
          <IconLinkCopy></IconLinkCopy>
        </Styled.FieldRemindCopy>
      </Styled.FieldRemindCopyContainer>
    );
  };

  return (
    <Styled.FieldRemindContainer>
      <div>
        {props.type === 'date' ? (
          <>
            <Styled.FieldRemindDate>
              <Typo.Label1 color={FONT_COLOR.GRAY_2}>{props.date}</Typo.Label1>
            </Styled.FieldRemindDate>
            <Styled.FieldRemindDesc>
              <Typo.SubHeader color={FONT_COLOR.GRAY_4}>{props.title}</Typo.SubHeader>
            </Styled.FieldRemindDesc>
            <Styled.FieldRemindDesc>
              <Typo.SubHeader color={FONT_COLOR.GRAY_4}>{props.desc}</Typo.SubHeader>
            </Styled.FieldRemindDesc>
          </>
        ) : (
          <>
            <CustomDatePicker type={props.type} date={props.date} onDateChange={props.onDateChange}></CustomDatePicker>
            <Styled.FieldRemindInputContainer>
              <FieldRemindTitleInput title={props.title} onTitleChange={props.onTitleChange}></FieldRemindTitleInput>
              <FieldRemindDescInput desc={props.desc} onDescChange={props.onDescChange}></FieldRemindDescInput>
            </Styled.FieldRemindInputContainer>
          </>
        )}
      </div>
      <CopyBtn></CopyBtn>
    </Styled.FieldRemindContainer>
  );
};
export default memo(FieldRemind);
