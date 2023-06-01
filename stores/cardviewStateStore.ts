import { atom } from 'recoil';
import { categories } from '@/types/cardview';
import { category } from '@/components/Atom/Card/types';

const categoryState = atom<categories[]>({
  key: 'categoryState',
  default: [],
});

const currentCategoryState = atom<keyof typeof category>({
  key: 'currentCategoryState',
  default: 'develop',
});

export { categoryState, currentCategoryState };
