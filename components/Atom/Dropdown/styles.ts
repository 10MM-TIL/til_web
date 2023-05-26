import styled from '@emotion/styled';

export const DROPDOWN_HEIGHT = 48;
export const DROPDOWN_MARGIN = 4;

export const DropdownContainer = styled.div`
  display: inline-block;
  min-width: 250px;
  height: ${DROPDOWN_HEIGHT}px;
  position: relative;
`;

export const DropdownText = styled.button<{ open: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #252e38; // Navy 4
  padding: 6px 20px;
  color: ${(props) => (props.open ? '#FFFFFF' : '#636C78')}; /* Font/Gray 2 */
  border-radius: 9px;
  box-shadow: inset 0 0 0 1px hsl(230deg 6% 23%);

  &.dropdown-active {
    box-shadow: inset 0 0 0 2px #22ffa2 !important;
  }

  &:hover {
    transition: all 0.15s ease 0s;
    box-shadow: inset 0 0 0 1px #22ffa282;
  }

  &::after {
    content: '';
    position: absolute;
    right: 10px;
    top: 16px;
    border: 7px solid transparent;
    border-color: #fff transparent transparent transparent;
  }
`;

// inset(top right bottom left)
export const OptionList = styled.div<{ isIntersectInTop: boolean }>(({ isIntersectInTop }) => ({
  position: 'absolute',
  zIndex: '100',
  display: 'block',
  boxSizing: 'border-box',
  width: '100%',
  maxHeight: '320px',
  padding: '8px 0',
  overflowY: 'scroll',
  background: 'hsl(230, 6%, 18%)',
  borderRadius: '9px',
  userSelect: 'none',
  transform: `${
    isIntersectInTop
      ? `translate(0px, ${DROPDOWN_HEIGHT + DROPDOWN_MARGIN}px)`
      : `translate(0px, -${DROPDOWN_HEIGHT + DROPDOWN_MARGIN}px)`
  }`,
  inset: `${isIntersectInTop ? '0px auto auto 0px' : 'auto auto 0px 0px'}`,
  '> ul': {
    margin: 0,
    padding: 0,
    textAlign: 'center',
    width: '100%',
  },
}));

export const OptionItem = styled.li`
  padding: 0 8px;
  background-color: #252e38; // Navy 4
  cursor: pointer;
  display: flex;
  width: 100%;
  height: 48px;

  button {
    align-items: center;
    background: inherit;
    width: 100%;
    height: 100%;
    padding: 0 16px;
    border-radius: 9px;
    font-size: 15px;
    line-height: 24px;
    text-align: left;
    color: hsl(230, 4%, 90%);
    transition: all 0.15s ease 0s;
  }

  &.option-selected {
    &:hover {
      button {
        background: rgba(84, 86, 95, 0.6);
        color: #ffffff;
      }
    }
    button {
      background: rgba(84, 86, 95, 0.2);
      color: #ffffff;
    }
  }
  &:hover {
    button {
      background: rgba(84, 86, 95, 0.2);
      color: #ffffff;
    }
  }
`;
