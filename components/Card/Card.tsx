import { ReactElement } from 'react';
import Image from 'next/image';
import { CardContainer, CardInfoWrapper, CardBodyContent } from './styles';
import * as Typo from '@/components/Typography';

export type CardProps = {
  size: 'sm' | 'lg';
  theme?: 'dark' | 'light';
  content?: CardContentProps;
};

const category = {
  develop: '개발자',
  design: '디자인',
  planning: '기획',
  marketing: '마케팅',
  startup: '기업/스타트업',
} as const;

export type CardContentProps = {
  category: keyof typeof category; // 카테고리가 픽스되면 as const로 정리 필요
  header: string;
  body: string;
  img: string;
  name: string;
  date: string;
};

export const Card = ({ size, theme = 'dark', content }: CardProps): ReactElement => {
  return (
    <div>
      <CardContainer size={size} theme={theme}>
        <div>
          <Typo.Label2 color='#22FFA2'>#{content?.category && category[content?.category]}</Typo.Label2>
        </div>
        <div>
          <Typo.H2 color='#DADFE6'>{content?.header}</Typo.H2>
        </div>
        <CardBodyContent>
          <Typo.Body color='#636C78'>{content?.body}</Typo.Body>
        </CardBodyContent>
        <CardInfoWrapper>
          <Image src={content?.img as string} alt='test' width={19} height={19} />
          <div>
            <Typo.Label1 color='#C5CAD0'>{content?.name}</Typo.Label1>
          </div>
          <div>
            <Typo.Label1 color='#636C78'>{content?.date}</Typo.Label1>
          </div>
        </CardInfoWrapper>
      </CardContainer>
    </div>
  );
};
