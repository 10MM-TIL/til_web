import { EditDropdownProps } from '@/components/EditDropdown';

export type TimeLineProps = {
  content?: TimeLineContentProps;
  editList: EditDropdownProps['editList'];
  moreButtonPositionCss?: EditDropdownProps['moreButtonPositionCss'];
  editListPositionCss?: EditDropdownProps['editListPositionCss'];
};
export type TimeLineContentProps = {
  date: string;
  body: string;
  img: string;
};
