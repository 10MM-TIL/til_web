import { ReactElement, useRef } from 'react';
import * as Typo from '@/components/Typography';
import { TextFieldContainer, TextFieldInput, TextFieldTextArea, TextFieldWrapper, TextFieldLength } from './styles';
import { useState } from 'react';
import { TextFieldProps } from './types';
import { FONT_COLOR } from '@/constants/color';

export const TextField = ({
  title,
  isInput = true,
  placeholder = '',
  maxLength = 200,
  inputValue,
  onChange,
}: TextFieldProps): ReactElement => {
  const [isFocus, setFocus] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 글자에 따라 textarea 높이가 변경됨
  const handleResizeHeight = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const toggleFocus = () => setFocus((prevFocus) => !prevFocus);
  const handleFocus = () => {
    isInput ? inputRef.current?.focus() : textareaRef.current?.focus();
    // focus 시 focus이벤트가 발생해 toggleFocus() 실행됌
  };

  return (
    <TextFieldContainer isInput={isInput} isFocus={isFocus} onClick={handleFocus}>
      <div>
        <Typo.H1 color={FONT_COLOR.WHITE}>{title}</Typo.H1>
      </div>

      <TextFieldWrapper isInput={isInput}>
        {isInput ? (
          <TextFieldInput
            ref={inputRef}
            type='text'
            placeholder={placeholder}
            maxLength={maxLength}
            value={inputValue}
            onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
            onFocus={toggleFocus}
            onBlur={toggleFocus}
          />
        ) : (
          <TextFieldTextArea
            ref={textareaRef}
            rows={1}
            placeholder={placeholder}
            value={inputValue}
            maxLength={maxLength}
            onChange={(e) => {
              (onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void)(e);
              handleResizeHeight();
            }}
            onFocus={toggleFocus}
            onBlur={toggleFocus}
          />
        )}
      </TextFieldWrapper>

      <TextFieldLength isInput={isInput}>
        <Typo.Label2 color={FONT_COLOR.GRAY_2}>
          {inputValue?.length} / {maxLength}
        </Typo.Label2>
      </TextFieldLength>
    </TextFieldContainer>
  );
};
