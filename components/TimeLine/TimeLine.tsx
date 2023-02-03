import { ReactElement, useState, useRef } from 'react';
import Image from 'next/image';
import * as Typo from '@/components/Typography';
import { TimeLineContainer, TimeLineContent, TimeLineDate, TimeLineDesc, TimeLineImage } from './styles';
import { TimeLineProps } from './types';
import { EditDropdown } from '@/components/EditDropdown';

export const TimeLine = ({
  content,
  editList,
  moreButtonPositionCss,
  editListPositionCss,
}: TimeLineProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const moreButtonRef = useRef<HTMLUListElement>(null);
  const toggleOepn = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  return (
    <TimeLineContainer>
      <EditDropdown
        editList={editList}
        isOpen={isOpen}
        moreButtonRef={moreButtonRef}
        onCloseDropdown={toggleOepn}
        moreButtonPositionCss={moreButtonPositionCss}
        editListPositionCss={editListPositionCss}
      ></EditDropdown>
      <TimeLineContent>
        <TimeLineDate>
          <Typo.Label1 color='#636C78'>{content?.date}</Typo.Label1>
        </TimeLineDate>
        <TimeLineDesc>
          <Typo.SubHeader color='#E0E6EE'>{content?.body}</Typo.SubHeader>
        </TimeLineDesc>
      </TimeLineContent>
      <TimeLineImage>
        <Image src={content?.img as string} alt='test' width={37} height={37} />
      </TimeLineImage>
    </TimeLineContainer>
  );
};
