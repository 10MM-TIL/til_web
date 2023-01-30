import styled from '@emotion/styled';
import { TimeLineProps } from './TimeLine';

export const TimeLineContainer = styled.div<TimeLineProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${({ size }) => (size === 'lg' ? '756px' : '496px')};
  height: ${({ size }) => (size === 'lg' ? '91px' : '69px')};
  background: #1e252f;
  border-radius: 6px;
  padding: ${({ size }) => (size === 'lg' ? '21px 36px 22px 24px' : '13px 22px 13px 24px')};
  cursor: pointer;
`;

export const TimeLineDate = styled.div<TimeLineProps>`
  margin-bottom: ${({ size }) => (size === 'lg' ? '8px' : '1px')};
`;

export const TimeLineDesc = styled.div<TimeLineProps>`
  width: ${({ size }) => (size === 'lg' ? '273px' : '141px')};
  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;

export const TimeLineImage = styled.div<TimeLineProps>`
  > img {
    width: ${({ size }) => (size === 'lg' ? '37px' : '36px')};
    height: ${({ size }) => (size === 'lg' ? '37px' : '36px')};
    border-radius: 50%;
  }
`;
