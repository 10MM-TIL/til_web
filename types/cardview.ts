import { CardContentProps } from '@/components/Atom/Card/types';

export type categories = {
  identifier: string;
  name: CardContentProps['category'];
  selected?: boolean;
};

export type recommandPostItem = {
  identifier: string;
  userPath: string;
  categoryIdentifier: string;
  title: string;
  description: string;
  url: string;
  createdAt: string;
  hitCount: number;
  userProfileSrc: string;
};

export type allPostItem = {
  identifier: string;
  userPath: string;
  categoryIdentifier: string;
  title: string;
  description: string;
  url: string;
  createdAt: string;
  hitCount: number;
  userProfileSrc: string;
};
