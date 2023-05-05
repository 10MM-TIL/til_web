import { MouseEventHandler, MouseEvent } from 'react';

export const category = {
  develop: '#개발',
  design: '#디자인',
  planning: '#기획',
  marketing: '#마케팅',
  startup: '#기업/스타트업',
  recomand: '#추천 회고',
} as const;

export type CardProps = {
  size: 'sm' | 'lg' | 'mobile';
  hasBadge?: boolean;
  content: CardContentProps;
  onClickTag: (event: MouseEvent, tag: (typeof category)[keyof typeof category]) => void;
  onClickContent: (url?: string) => void;
  onClickUser: MouseEventHandler<HTMLDivElement>;
};

export type CardContentProps = {
  category: (typeof category)[keyof typeof category]; // 카테고리가 픽스되면 as const로 정리 필요
  header: string;
  body: string;
  img: string;
  name: string;
  date: string;
};
