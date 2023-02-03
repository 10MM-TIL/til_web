import { ChangeEvent } from 'react';

export type TextFieldProps = {
  title: string;
  placeholder?: string;
  maxLength?: number;
  inputValue: string;
} & (
  | {
      // The discriminated union
      isInput?: true;
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }
  | {
      isInput?: false;
      onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    }
);
