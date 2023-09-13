import { ReactElement, KeyboardEvent, useState, useRef, useEffect, useLayoutEffect } from 'react';
import { DropdownContainer, DropdownText, OptionList, OptionItem } from './styles';
import { useOutSideRef } from '@/hooks/useOutSideRef';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface DropDownProps {
  optionList: DropdownOptionList[];
  defaultSelectIndex?: number;
}

interface DropdownOptionList {
  id: string;
  name: string;
}

export const Dropdown = ({ optionList, defaultSelectIndex = 0 }: DropDownProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [onFocus, setOnFocus] = useState(false);
  const [cursor, setCurser] = useState(0); // 키보드로 움직이는 cursor
  const [defaultSelect, setDefaultSelect] = useState(optionList[defaultSelectIndex].name);
  const outsideRef = useOutSideRef<HTMLDivElement>(() => setIsOpen(false));
  const dropdownRef = useRef<HTMLButtonElement>(null);

  const [isIntersectInTop, setIsIntersectInTop] = useState(true);

  const observerRef = useIntersectionObserver(
    (entry: IntersectionObserverEntry) => {
      if (entry.intersectionRatio <= 0) return;
      checkInnerView();
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1] },
  );

  useEffect(() => {
    if (!isOpen) return;
    checkInnerView();
  }, [isOpen]);

  const toggleOptionList = () => setIsOpen((prevIsOpen) => !prevIsOpen);
  const toggleFocus = () => setOnFocus((prevOnFocus) => !prevOnFocus);

  const handleSelect = () => {
    toggleOptionList();
    setCurser(optionList.findIndex((i) => i.name === defaultSelect));
  };

  // 드롭다운이 어디에 위치할지 구해주는 함수
  const checkInnerView = () => {
    const dropdownRect = dropdownRef.current?.getBoundingClientRect();
    if (!dropdownRect) return;
    const spaceAbove = dropdownRect.top;
    const spaceBelow = window.innerHeight - dropdownRect.top;

    // 아래 공간이 더 많이 남았으면 아래로 보여주기
    // 위의 공간이 더 많이 남았으면 위로 보여주기
    setIsIntersectInTop(spaceBelow >= spaceAbove ? true : false);
  };

  const handleOptionClick = (name: string) => {
    setIsOpen(false);
    setDefaultSelect(name);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    // 열리지 않았을때는 기본적인 기능 활성화
    if (isOpen) {
      e.stopPropagation();
      e.preventDefault();
    }

    // focus 된 상태에서 Enter, ArrowDown 키 클릭시 optionList open
    if (!isOpen && (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.stopPropagation();
      e.preventDefault();
      toggleOptionList();
      return;
    }

    // Esc키로 optionList 끄기
    if (e.key === 'Escape') {
      setIsOpen(false);
      return;
    }

    // Enter키로 선택 가능
    if (e.key === 'Enter') {
      handleOptionClick(optionList[cursor].name);
      return;
    }

    if (e.key === 'ArrowUp') {
      cursor > 0 ? setCurser((cursor) => cursor - 1) : setCurser(optionList.length - 1);
    } else if (e.key === 'ArrowDown' || e.key === 'Tab') {
      cursor < optionList.length - 1 ? setCurser((cursor) => cursor + 1) : setCurser(0);
    }
  };

  return (
    <DropdownContainer ref={outsideRef}>
      <DropdownText
        ref={dropdownRef}
        open={isOpen}
        onFocus={toggleFocus}
        onBlur={toggleFocus}
        className={onFocus ? 'dropdown-active' : ''}
        onClick={handleSelect}
        onKeyDown={handleKeyDown}
      >
        {defaultSelect}
      </DropdownText>
      {isOpen ? (
        <OptionList ref={observerRef} isIntersectInTop={isIntersectInTop}>
          <ul>
            {optionList.map((option, index) => {
              return (
                <OptionItem
                  key={option.id}
                  className={index === cursor ? 'option-selected' : ''}
                  onClick={() => handleOptionClick(option.name)}
                >
                  <button>{option.name}</button>
                </OptionItem>
              );
            })}
          </ul>
        </OptionList>
      ) : null}
    </DropdownContainer>
  );
};
