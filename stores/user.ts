import { atom } from 'recoil';
import { getMyProfileResponse, getBlogResponse } from '@/types/user';

export const userInformation = atom<getMyProfileResponse>({
  key: 'userInformation',
  default: {
    name: '',
    path: '',
    profileImgSrc: '',
    introduction: '',
    categoryId: '',
    isAuthorized: false,
  },
});

export const myBloglist = atom<getBlogResponse[]>({
  key: 'blogList',
  default: [],
});

export const myTimelineList = atom({
  key: 'postList',
  default: [],
});
