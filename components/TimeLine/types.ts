import { EditDropdownProps } from '@/components/EditDropdown';

export type TimeLineProps = {
  content?: TimeLineContentProps;
  moreButtonPositionCss?: EditDropdownProps['moreButtonPositionCss'];
  editListPositionCss?: EditDropdownProps['editListPositionCss'];
  onSaveAllContent: (timeLineContent: TimeLineContentProps) => Promise<void>;
  onDeleteContent: () => Promise<void>;
};
export type TimeLineContentProps = {
  date: string;
  title: string;
  desc: string;
  img: string;
};
