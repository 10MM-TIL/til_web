import { EditDropdownProps } from '@/components/Atom/EditDropdown';

export type TimeLineProps = {
  content?: TimeLineContentProps;
  moreButtonPositionCss?: EditDropdownProps['moreButtonPositionCss'];
  editListPositionCss?: EditDropdownProps['editListPositionCss'];
  onDeleteContent: () => void;
  changable: boolean;
};
export type TimeLineContentProps = {
  date: string;
  title: string;
  qna: { question: string; answer: string }[];
};
