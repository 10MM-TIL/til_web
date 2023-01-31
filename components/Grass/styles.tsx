import styled from '@emotion/styled';
import { GrassStatus } from './types';

export const GrassContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  width: 189px;
  height: 170px;
  background: #1e252f;
  border-radius: 11px;
`;

export const GrassDate = styled.div`
  margin-bottom: 11px;
`;

export const GrassRowG = styled.g`
  box-shadow: 0px 0px 6px rgba(0, 168, 168, 0.18);
`;

export const GrassCell = styled('rect')<{ cellStatus: GrassStatus }>`
  cursor: ${({ cellStatus }) => (cellStatus !== 'disabled' ? 'pointer' : 'default')};
  fill: ${({ cellStatus }) =>
    cellStatus === 'stack' ? '#22ffa2' : cellStatus === 'unstack' ? '#3B4652' : 'rgba(0, 0, 0, 0.12)'};
  background: ${({ cellStatus }) =>
    cellStatus === 'stack' ? '#22ffa2' : cellStatus === 'unstack' ? '#3B4652' : 'rgba(0, 0, 0, 0.12)'};
`;
