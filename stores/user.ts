import { atom } from 'recoil';
import { getBlogResponse } from '@/types/user';
import { MyUserModel } from '../types';

export const myInformation = atom<MyUserModel>({
  key: 'myInformation',
  default: {
    name: '',
    path: '',
    profileImgSrc: '',
    introduction: '',
    categoryIdentifier: '',
    categoryName: '',
    isAuthorized: false,
    email: '',
    mailAgreement: false,
    oauthType: '',
  },
});

export const myBloglist = atom<getBlogResponse[]>({
  key: 'blogList',
  default: [],
});

// 알림기능 미사용
interface notificationType {
  enable: boolean;
  iteration: string;
}

export const myNotification = atom<notificationType>({
  key: 'myNotification',
  default: { enable: false, iteration: 'DAY' },
});

export const myMailAgreement = atom<boolean>({
  key: 'myMailAgreement',
  default: false,
});

export const clickedGrassDate = atom<string>({
  key: 'clickedGrassDate',
  default: '',
});

export const myOauthEmail = atom<string>({
  key: 'myOauthEmail',
  default: '',
});
