import styled from '@emotion/styled';
import { FONT_COLOR } from '@/constants/color';

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
  color: ${FONT_COLOR.GRAY_3};
`;
