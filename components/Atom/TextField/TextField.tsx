import { memo, ReactElement, MouseEvent, useCallback, useRef, useMemo, useEffect } from 'react';
import * as Typo from '@/components/Atom/Typography';
import * as Style from './styles';
import { useState } from 'react';
import { TextFieldProps } from './types';
import { FONT_COLOR } from '@/constants/color';
import { IconCopy } from '@/assets/svgs/IconCopy';
import useCopyClipBoard from '@/hooks/useCopyClipBoard';
import ToastMessage from '@/components/ToastMessage';
import useToast from '@/hooks/useToast';
import IconCheckBig from '@/assets/svgs/IconCheckBig';

const DOMAIN = 'bricklog.kr/';
const TextField = ({
  title,
  isInput,
  placeholder = '',
  maxLength = 200,
  useFixedString = false,
  useCopy = false,
  inputValue,
  onChange,
}: TextFieldProps): ReactElement => {
  const [isFocus, setFocus] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fixedStringRef = useRef<HTMLParagraphElement>(null);
  const [fixedStringWidth, setFixedStringWidth] = useState(0);
  const [isCopy, onCopy] = useCopyClipBoard();
  const { isOpen, showToast, text } = useToast();

  // focus 시 focus이벤트가 발생해 toggleFocus() 실행됌
  const toggleFocus = useCallback(() => setFocus((prevFocus) => !prevFocus), []);
  const handleResizeHeight = useCallback(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, []);

  // 소개 필드에 이미 200자정도 작성해놓고 화면을 resize 하면
  // 이전에 정한 height 으로 고정이 되기 때문에 화면 리사이즈시에 새로운 height 으로 지정
  useEffect(() => {
    window.addEventListener('resize', handleResizeHeight);
    return () => window.removeEventListener('resize', handleResizeHeight);
  }, [handleResizeHeight]);
  // 글자에 따라 textarea 높이가 변경됨

  const handleFocus = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      // 고정된 스트링 또는 복사하기 버튼 클릭시는 무시
      // e.stopPropagation 으로 막음
      isInput ? inputRef.current?.focus() : textareaRef.current?.focus();
    },
    [isInput],
  );

  const TextFieldTitle = memo(function TextFieldTitle() {
    return (
      <div>
        <Typo.H1 color={FONT_COLOR.WHITE}>{title}</Typo.H1>
      </div>
    );
  });

  useEffect(() => {
    if (fixedStringRef.current) setFixedStringWidth(fixedStringRef.current.clientWidth);
  }, []);

  const TextFieldFixedStringComp = memo(function TextFieldFixedStringComp() {
    return (
      <Style.TextFieldFixedString onClick={(e) => e.stopPropagation()}>
        <Typo.Body ref={fixedStringRef} color='#545454'>
          {DOMAIN}
        </Typo.Body>
      </Style.TextFieldFixedString>
    );
  });

  const TextFieldCopyIcon = memo(function TextFieldCopyIcon() {
    const copyUrl = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onCopy(`${DOMAIN}${inputValue}`);
      showToast(
        <>
          <IconCheckBig />
          <Typo.H1 color={FONT_COLOR.WHITE}>복사 완료!</Typo.H1>
        </>,
      );
    };
    // mouseDown 이벤트로 처리해야 blur 이벤트보다 먼저 처리된다.
    return (
      <Style.TextFieldCopy onMouseDown={copyUrl}>
        <IconCopy></IconCopy>
      </Style.TextFieldCopy>
    );
  });

  return (
    <Style.TextFieldContainer isInput={isInput} isFocus={isFocus} useCopy={useCopy} onClick={handleFocus}>
      <TextFieldTitle></TextFieldTitle>
      <Style.TextFieldWrapper isInput={isInput}>
        {isInput ? (
          <>
            <Style.TextFieldInput
              ref={inputRef}
              type='text'
              placeholder={placeholder}
              maxLength={maxLength}
              value={inputValue}
              onChange={onChange}
              onFocus={toggleFocus}
              onBlur={toggleFocus}
              useFixedString={useFixedString}
              fixedWidth={fixedStringWidth}
            />
            {useFixedString ? <TextFieldFixedStringComp></TextFieldFixedStringComp> : null}
          </>
        ) : (
          <Style.TextFieldTextArea
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
      </Style.TextFieldWrapper>
      <Style.TextFieldLength isInput={isInput} useCopy={useCopy}>
        <Typo.Label2 color={FONT_COLOR.GRAY_2}>
          {inputValue?.length} / {maxLength}
        </Typo.Label2>
      </Style.TextFieldLength>
      {useCopy ? <TextFieldCopyIcon></TextFieldCopyIcon> : null}
      {isOpen && <ToastMessage isOpen={isCopy}>{text}</ToastMessage>}
    </Style.TextFieldContainer>
  );
};

export default memo(TextField);
