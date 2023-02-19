import { useClickAway } from 'react-use';
import { useRef, RefObject, memo } from 'react';
import { MoreButtonWrapper, EditDropdownWrapper, EditDropdownItem } from './styles';
import { EditDropdownProps } from './types';
import * as Typo from '@/components/Typography';

// 더보기 버튼 (...)
const MoreButton = memo(function MoreButton({
  handleEdit,
  moreButtonRef,
  moreButtonPositionCss,
}: {
  handleEdit: () => void;
  moreButtonRef: RefObject<HTMLUListElement>;
  moreButtonPositionCss: EditDropdownProps['moreButtonPositionCss'];
}) {
  return (
    <MoreButtonWrapper ref={moreButtonRef} onClick={handleEdit} moreButtonPositionCss={moreButtonPositionCss}>
      {[...Array(3)].map((_, i) => {
        return <li key={`dot-${i}`}></li>;
      })}
    </MoreButtonWrapper>
  );
});

// 수정/삭제 버튼
const EditDropDownContainer = memo(function EditDropDownContainer({
  editList,
  onCloseDropdown,
  moreButtonRef,
  editListPositionCss,
}: Omit<EditDropdownProps, 'isOpen' | 'moreButtonPositionCss'>) {
  const editRef = useRef(null);
  useClickAway(editRef, (e) => {
    // 더보기 버튼 클릭시에는 바깥쪽으로 인식을 하지 않음
    // 즉, 클릭한 곳이 더보기 버튼 이라면 패스
    if (e.target === moreButtonRef.current) return;
    onCloseDropdown();
  });

  return (
    <EditDropdownWrapper ref={editRef} editListPositionCss={editListPositionCss}>
      {editList.map((editItem, index) => {
        return (
          <EditDropdownItem key={`editItem-${index}`} onClick={editItem.onClickHandler}>
            <Typo.Label2>{editItem.text}</Typo.Label2>
          </EditDropdownItem>
        );
      })}
    </EditDropdownWrapper>
  );
});

// 더보기 버튼 + [수정, 삭제] 드롭다운
const EditDropdown = ({
  editList,
  isOpen,
  onCloseDropdown,
  moreButtonPositionCss,
  editListPositionCss,
}: EditDropdownProps) => {
  const moreButtonRef = useRef<HTMLUListElement>(null);
  return (
    <>
      <MoreButton
        moreButtonRef={moreButtonRef}
        handleEdit={onCloseDropdown}
        moreButtonPositionCss={moreButtonPositionCss}
      ></MoreButton>
      {isOpen ? (
        <EditDropDownContainer
          editList={editList}
          moreButtonRef={moreButtonRef}
          onCloseDropdown={onCloseDropdown}
          editListPositionCss={editListPositionCss}
        ></EditDropDownContainer>
      ) : null}
    </>
  );
};

export default memo(EditDropdown);
