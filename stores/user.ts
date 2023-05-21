import { atom } from 'recoil';
import { getBlogResponse } from '@/types/user';

export const myBloglist = atom<getBlogResponse[]>({
  key: 'blogList',
  default: [],
});

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
