import { ReactNode } from 'react';
import { atom } from 'recoil';

export const ToastIsOpenState = atom<boolean>({
  key: 'ToastIsOpenState',
  default: false,
});

export const ToastTextState = atom<ReactNode>({
  key: 'ToastTextState',
  default: null,
});

export const ToastWarningState = atom({
  key: 'ToastWarningState',
  default: false,
});
