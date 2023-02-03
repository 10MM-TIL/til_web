import { ReactElement } from 'react';
import Image from 'next/image';
import {
  CardContainer,
  CardHeader,
  CardInfoWrapper,
  CardBodyContent,
  BadgeTop,
  BadgeBottom,
  CrownIcon,
} from './styles';
import * as Typo from '@/components/Typography';
import { CardProps, category } from './types';

export const Badge = ({ size }: Pick<CardProps, 'size'>) => {
  return (
    <>
      <BadgeTop size={size}>
        <CrownIcon size={size} />
      </BadgeTop>
      <BadgeBottom size={size}></BadgeBottom>
    </>
  );
};

export const Card = ({ size, theme = 'dark', hasBadge = false, content }: CardProps): ReactElement => {
  return (
    <CardContainer size={size} theme={theme}>
      {hasBadge ? <Badge size={size} /> : null}
      <CardHeader>
        <Typo.Label2 color='#22FFA2'>
          #{content?.category && category[content?.category]}
          {hasBadge && size === 'sm' ? ' #추천 회고' : ''}
        </Typo.Label2>
      </CardHeader>
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
  );
};
