import { ChangeEvent } from 'react';

export type TextFieldProps = TextFieldPropsForTextArea | TextFieldPropsForInput;

type TextFieldForInput = {
  isInput: true;
  useFixedString: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

type TextFieldForTextArea = {
  isInput: false;
  useFixedString?: never; // useFixedString이 한쪽에만 존재해 props로 받을 때 오류나지 않도록 처리
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

type RequiredTextFieldProps = { title: string; placeholder?: string; maxLength?: number; inputValue: string };
type TextFieldPropsForInput = RequiredTextFieldProps & TextFieldForInput;
type TextFieldPropsForTextArea = RequiredTextFieldProps & TextFieldForTextArea;
