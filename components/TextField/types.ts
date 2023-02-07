import { ChangeEvent } from 'react';

export type TextFieldProps = TextFieldPropsForTextArea | TextFieldPropsForInput;

type TextFieldForInput = {
  isInput: true;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

type TextFieldForTextArea = {
  isInput: false;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

type RequiredTextFieldProps = { title: string; placeholder?: string; maxLength?: number; inputValue: string };
type TextFieldPropsForInput = RequiredTextFieldProps & TextFieldForInput;
type TextFieldPropsForTextArea = RequiredTextFieldProps & TextFieldForTextArea;
