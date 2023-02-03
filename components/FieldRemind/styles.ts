import styled from '@emotion/styled';

export const FieldRemindContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 496px;
  height: 69px;
  background: #1e252f;
  border-radius: 6px;
  padding: 13px 22px 13px 24px;
  cursor: pointer;
`;

export const FieldRemindDate = styled.div`
  margin-bottom: 1px;
`;

export const FieldRemindDesc = styled.div`
  width: 141px;
  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;
