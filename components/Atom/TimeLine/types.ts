import { EditDropdownProps } from '@/components/Atom/EditDropdown';

export type TimeLineProps = {
  content?: TimeLineContentProps;
  moreButtonPositionCss?: EditDropdownProps['moreButtonPositionCss'];
  editListPositionCss?: EditDropdownProps['editListPositionCss'];
  onSaveAllContent: (timeLineContent: TimeLineContentProps) => void;
  onDeleteContent: () => void;
  changable: boolean;
};
export type TimeLineContentProps = {
  date: string;
  title: string;
  desc: string;
  url: string;
};
