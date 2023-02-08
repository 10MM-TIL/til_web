import { memo, ReactElement, MouseEvent, useCallback, useRef } from 'react';
import * as Typo from '@/components/Typography';
import {
  TextFieldContainer,
  TextFieldInput,
  TextFieldTextArea,
  TextFieldWrapper,
  TextFieldLength,
  TextFieldFixedString,
} from './styles';
import { useState } from 'react';
import { TextFieldProps } from './types';
import { FONT_COLOR } from '@/constants/color';
const DOMAIN = 'bricklog.kr/';
const TextField = ({
  title,
  isInput,
  placeholder = '',
  maxLength = 200,
  useFixedString = false,
  inputValue,
  onChange,
}: TextFieldProps): ReactElement => {
  const [isFocus, setFocus] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fixeStringRef = useRef<HTMLParagraphElement>(null);

  // 글자에 따라 textarea 높이가 변경됨
  const handleResizeHeight = useCallback(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, []);

  const toggleFocus = useCallback(() => setFocus((prevFocus) => !prevFocus), []);
  // focus 시 focus이벤트가 발생해 toggleFocus() 실행됌

  const handleFocus = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      // 고정된 스트링 클릭시는 무시
      if (e.target === fixeStringRef.current) return;
      isInput ? inputRef.current?.focus() : textareaRef.current?.focus();
    },
    [isInput],
  );

  return (
    <TextFieldContainer isInput={isInput} isFocus={isFocus} onClick={handleFocus}>
      <div>
        <Typo.H1 color={FONT_COLOR.WHITE}>{title}</Typo.H1>
      </div>

      <TextFieldWrapper isInput={isInput}>
        {isInput ? (
          <>
            <TextFieldInput
              ref={inputRef}
              type='text'
              placeholder={placeholder}
              maxLength={maxLength}
              value={inputValue}
              onChange={onChange}
              onFocus={toggleFocus}
              onBlur={toggleFocus}
              useFixedString={useFixedString}
              fixedWidth={fixeStringRef.current?.clientWidth ?? 0}
            />
            {useFixedString ? (
              <TextFieldFixedString>
                <Typo.Body ref={fixeStringRef} color='#545454'>
                  {DOMAIN}
                </Typo.Body>
              </TextFieldFixedString>
            ) : null}
          </>
        ) : (
          <TextFieldTextArea
            ref={textareaRef}
            rows={1}
            placeholder={placeholder}
            value={inputValue}
            maxLength={maxLength}
            onChange={(e) => {
              onChange(e);
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

export default memo(TextField);
