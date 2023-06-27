import { atom } from 'recoil';

export const LoginModalState = atom<{ isLoginModalOpen: boolean }>({
  key: 'LoginModalState',
  default: {
    isLoginModalOpen: false,
  },
});
