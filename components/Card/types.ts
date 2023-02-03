export const category = {
  develop: '개발자',
  design: '디자인',
  planning: '기획',
  marketing: '마케팅',
  startup: '기업/스타트업',
} as const;

export type CardProps = {
  size: 'sm' | 'lg';
  theme?: 'dark' | 'light';
  hasBadge?: boolean;
  content?: CardContentProps;
};

type CardContentProps = {
  category: keyof typeof category; // 카테고리가 픽스되면 as const로 정리 필요
  header: string;
  body: string;
  img: string;
  name: string;
  date: string;
};
