import styled from '@emotion/styled';
import Copy from '@/assets/svgs/copy.svg';
import Calendar from '@/assets/svgs/calendar.svg';
import { FieldRemindProps } from './types';
import { BACKGROUND_COLOR, FONT_COLOR, POINT_COLOR } from '@/constants/color';

export const FieldRemindContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 496px;
  height: 69px;
  background: ${BACKGROUND_COLOR.NAVY_3};
  border-radius: 6px;
  padding: 13px 22px 13px 24px;
`;

export const FieldRemindDatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const FieldRemindDate = styled.div<{ type?: FieldRemindProps['type'] }>`
  margin-bottom: 1px;
  display: flex;
  align-items: center;
  /* min-width: ${({ type }) => (type === 'datepicker' ? '120px' : '')}; */
  cursor: pointer;
`;

export const FieldRemindDesc = styled.div`
  width: 141px;
  cursor: pointer;
  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;

export const FieldRemindCopyContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const FieldRemindCopy = styled.div`
  width: 33.33px;
  height: 33.33px;
  background: ${BACKGROUND_COLOR.FIELD_10};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CopyIcon = styled(Copy)`
  display: block;
`;

export const FieldRemindTitleInput = styled.input`
  width: 197px;
  height: 26px;
  border-bottom: 1px solid ${FONT_COLOR.GRAY_2};
  background: transparent;
  font-weight: 700;
  font-size: 14px;
  line-height: 26px;
  color: ${FONT_COLOR.WHITE};
  &::placeholder {
    color: ${FONT_COLOR.GRAY_3};
  }
  &:focus {
    border-bottom: 1px solid ${POINT_COLOR.MAIN};
    transition: all 0.15s ease 0s;
  }
`;

export const CalendarIcon = styled(Calendar)`
  cursor: pointer;
  margin-left: -2px;
`;
