import { RefObject } from 'react';
import { CSSProperties } from 'react';

type cssPositionType = {
  top?: CSSProperties['top'];
  bottom?: CSSProperties['bottom'];
  right?: CSSProperties['right'];
  left?: CSSProperties['left'];
};

export type EditDropdownProps = {
  editList: EditDropdownItem[];
  isOpen: boolean;
  moreButtonRef: RefObject<HTMLUListElement>;
  onCloseDropdown: () => void;
  moreButtonPositionCss?: cssPositionType;
  editListPositionCss?: cssPositionType;
};

type EditDropdownItem = {
  text: string;
  onClickHandler: () => void;
};
