import styled from '@emotion/styled';

export const TimeLineContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 756px;
  height: 91px;
  background: #1e252f;
  border-radius: 6px;
  padding: 21px 36px 22px 24px;
`;

export const TimeLineContent = styled.div`
  cursor: pointer;
`;
export const TimeLineDate = styled.div`
  margin-bottom: 8px;
`;

export const TimeLineDesc = styled.div`
  width: 273px;
  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;

export const TimeLineImage = styled.div`
  > img {
    width: 37px;
    height: 37px;
    border-radius: 50%;
  }
`;
