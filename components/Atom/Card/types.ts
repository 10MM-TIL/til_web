import { RetrospectItem } from '@/apis/retrospectCardview';
import { MouseEventHandler, MouseEvent } from 'react';

export const category = {
  all: '전체',
  develop: '#개발',
  design: '#디자인',
  planning: '#기획',
  marketing: '#마케팅',
  company: '#기업/스타트업',
  recommand: '#추천 회고',
} as const;
export type CategoryKeys = keyof typeof category;
export type CategoryQueryKeys = Exclude<CategoryKeys, 'recommand'> | '';

export type CategoryValues = (typeof category)[CategoryKeys];

export type CardProps = {
  size: 'sm' | 'lg' | 'mobile';
  hasBadge?: boolean;
  content: CardContentProps;
  onClickUser: (userpath?: string) => void;
  userpath: string;
  isPrivate: boolean;
  item: RetrospectItem;
};

export type CardContentProps = {
  category: (typeof category)[keyof typeof category]; // 카테고리가 픽스되면 as const로 정리 필요
  header: string;
  body: string;
  img: string;
  name: string;
  date: string;
};
