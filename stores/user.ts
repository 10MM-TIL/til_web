import { atom } from 'recoil';
import { getBlogResponse } from '@/types/user';

export const myBloglist = atom<getBlogResponse[]>({
  key: 'blogList',
  default: [],
});
