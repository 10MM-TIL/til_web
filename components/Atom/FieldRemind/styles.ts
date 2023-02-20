import styled from '@emotion/styled';
import { FieldRemindProps } from './types';
import { BACKGROUND_COLOR, FONT_COLOR, POINT_COLOR } from '@/constants/color';

export const FieldRemindContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 89px;
  background: ${BACKGROUND_COLOR.NAVY_3};
  border-radius: 6px;
  padding: 12px 24px 11px 24px;
  flex-wrap: nowrap;

  > div:nth-of-type(1) {
    flex-grow: 1;
    max-width: 339px;
    min-width: 217px;
  }
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

export const FieldRemindInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 1px;
`;

export const FieldRemindInput = styled.input`
  width: calc(100% - 50px);
  height: 24px;
  border-bottom: 2px solid ${FONT_COLOR.GRAY_2};
  background: transparent;
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  color: ${FONT_COLOR.WHITE};
  &::placeholder {
    font-size: 13px;
    line-height: 16px;
    font-weight: 400;
    color: ${FONT_COLOR.GRAY_3};
  }
  &:focus {
    border-bottom: 2px solid ${POINT_COLOR.MAIN};
    transition: all 0.15s ease 0s;
  }
`;

export const CalendarIcon = styled.div`
  cursor: pointer;
  margin-left: -2px;
`;
