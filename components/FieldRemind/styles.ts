import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Copy from '@/assets/svgs/copy.svg';
import Calendar from '@/assets/svgs/calendar.svg';
import { FieldRemindProps } from './types';

export const FieldRemindContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 496px;
  height: 69px;
  background: #1e252f;
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
  background: rgba(255, 255, 255, 0.1);
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
  border-bottom: 1px solid #636c78;
  background: transparent;
  font-weight: 700;
  font-size: 14px;
  line-height: 26px;
  color: #ffffff;
  &::placeholder {
    color: #c5cad0;
  }
  &:focus {
    border-bottom: 1px solid #22ffa2;
    transition: all 0.15s ease 0s;
  }
`;

export const CalendarIcon = styled(Calendar)`
  cursor: pointer;
  margin-left: -2px;
`;
