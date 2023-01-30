import { ReactElement } from 'react';
import Image from 'next/image';
import * as Typo from '@/components/Typography';
import { TimeLineContainer, TimeLineDate, TimeLineDesc, TimeLineImage } from './styles';

export type TimeLineProps = {
  size: 'sm' | 'lg';
  content?: TimeLineContentProps;
};

export type TimeLineContentProps = {
  date: string;
  body: string;
  img: string;
};

export const TimeLine = ({ size = 'lg', content }: TimeLineProps): ReactElement => {
  return (
    <TimeLineContainer size={size}>
      <div>
        <TimeLineDate size={size}>
          <Typo.Label1 color='#636C78'>{content?.date}</Typo.Label1>
        </TimeLineDate>
        <TimeLineDesc size={size}>
          <Typo.SubHeader color='#E0E6EE'>{content?.body}</Typo.SubHeader>
        </TimeLineDesc>
      </div>
      <TimeLineImage size={size}>
        <Image src={content?.img as string} alt='test' width={37} height={37} />
      </TimeLineImage>
    </TimeLineContainer>
  );
};
