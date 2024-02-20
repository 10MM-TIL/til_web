import styled from '@emotion/styled';
import { BACKGROUND_COLOR } from '@/constants/color';

export const CategoryWrapper = styled.div`
  padding-left: 14px;
  line-height: 36px;
`;

export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
`;

export const QnAWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 8px;
`;

export const AnswerWrapper = styled.div`
  padding: 24px 20px 16px 12px;
  border-radius: 6px;
  margin-left: -8px;

  background: ${BACKGROUND_COLOR.NAVY_2};
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;

  > img {
    border-radius: 47.5px;
    margin-right: 6px;
  }
`;
