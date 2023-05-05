import { atom } from 'recoil';
import { categories } from '@/types/cardview';
import { CardProps } from '@/components/Atom/Card';

const categoryState = atom<categories[]>({
  key: 'categoryState',
  default: [],
});

const allPostState = atom<(CardProps['content'] & { url: string; identifier: string; userPath: string })[]>({
  key: 'allPostState',
  default: [],
});

export { categoryState, allPostState };
