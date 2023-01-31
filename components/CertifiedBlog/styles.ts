import styled from '@emotion/styled';

export const CertifiedBlogContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 377px;
  height: 45px;
  background: #252e38;
  border-radius: 12px;
  padding: 10px 18px 10px 24px;
`;

export const CertifiedBlogBadge = styled.div`
  display: flex;
  align-items: center;
  margin-right: 25px;
`;

// 블로그 이름이 길다면 어떻게 할것 인가??
export const CertifiedBlogName = styled.div`
  margin-left: 8px;
  width: 174px;
`;

export const DeleteButton = styled.button`
  position: absolute;
  width: 24px;
  height: 24px;
  right: 18px;
  &::before,
  &::after {
    position: absolute;
    top: 4px;
    right: 11px;
    /* right: 8px; */
    content: '';
    height: 16px;
    width: 1.8px;
    background-color: #ffff;
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;
