import { atom } from 'recoil';
import { categories } from '@/types/cardview';

const categoryState = atom<categories[]>({
  key: 'categoryState',
  default: [],
});

export { categoryState };
