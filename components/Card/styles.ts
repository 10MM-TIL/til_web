import styled from '@emotion/styled';
import { CardProps } from './Card';

export const CardContainer = styled.div<CardProps>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: ${({ theme }) => (theme === 'dark' ? '#191f28' : 'rgba(255, 255, 255, 0.06)')};
  color: #ffffff;
  border: ${({ theme }) =>
    theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.07)' : '1px solid rgba(255, 255, 255, 0.07)'};
  border-radius: 9px;
  width: ${({ size }) => (size === 'sm' ? '284px' : '384px')};
  height: ${({ size }) => (size === 'sm' ? '132px' : '170px')};
  padding: ${({ size }) => (size === 'sm' ? '16px 23px 16px 20px' : '35px 40px')};
  cursor: pointer;
  > div:first-child {
    margin-bottom: 4px;
  }
`;

export const CardBodyContent = styled.div`
  width: 241px;
  > p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;

export const CardInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
  > img {
    border-radius: 47.5px;
    margin-right: 6px;
  }
  > div:nth-child(2) {
    margin-right: 8px;
  }
`;
