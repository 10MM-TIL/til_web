import { ChangeEventHandler } from 'react';
import { ChangeEvent, MouseEventHandler } from 'react';

type RequiredPropsForDatepicker = {
  // 제목 설정
  title: string;
  onTitleChange: ChangeEventHandler<HTMLInputElement>;

  date: Date | null;
  onDateChange: (date: Date | null) => void;
};

type FieldRemindPropsForDate = {
  type: 'date';
  date: string;
  desc: string;
  onClickCopy?: MouseEventHandler<HTMLDivElement>;
};

// datepicker 일떄는 필수인 props를 넘기도록
export type FieldRemindPropsForDatepicker = {
  type: 'datepicker';
  onClickCopy?: MouseEventHandler<HTMLDivElement>;
} & RequiredPropsForDatepicker;

export type FieldRemindProps = FieldRemindPropsForDate | FieldRemindPropsForDatepicker;
