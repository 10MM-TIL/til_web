import styled from '@emotion/styled';
import { FONT_COLOR, POINT_COLOR, BACKGROUND_COLOR } from '@/constants/color';

export const TextFieldContainer = styled.div<{ isInput: boolean; isFocus: boolean }>`
  position: relative;
  display: flex;
  width: 483px;
  min-height: ${({ isInput }) => (isInput ? '56px' : '96px')};
  background: ${BACKGROUND_COLOR.NAVY_3};
  border-radius: 12px;
  padding: ${({ isInput }) => (isInput ? '16px 24px' : '16px 16px 16px 24px')};
  transition: all 0.15s ease 0s;
  border: 1px solid transparent;
  ${({ isFocus }) => (isFocus ? `border: 1px solid ${POINT_COLOR}` : '')};

  &:hover {
    ${({ isFocus }) => (!isFocus ? 'border: 1px solid #22ffa299;' : '')};
  }
  > div:first-of-type {
    margin-right: 18px;
  }
`;

export const TextFieldWrapper = styled.div<{ isInput: boolean }>`
  position: relative;
  width: ${({ isInput }) => (isInput ? '268px' : '395px')};
  min-height: ${({ isInput }) => (isInput ? '24px' : '64px')};
`;

export const TextFieldInput = styled.input`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  /* url 설정 하는 color 색상 보류 */
  color: #545454;
`;

export const TextFieldTextArea = styled.textarea`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  background: transparent;
  resize: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${FONT_COLOR.WHITE};
`;

export const TextFieldLength = styled.div<{ isInput: boolean }>`
  position: absolute;
  right: 16px;
  ${({ isInput }) => (isInput ? 'top: 17px' : 'bottom: 16px')};
`;
