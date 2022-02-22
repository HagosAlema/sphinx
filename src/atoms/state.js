import { atom } from 'recoil';

export const accountAtom = atom({
  key: 'accountAtom',
  default: null,
});

export const balance = atom({
  key: 'balance',
  default: 0
})

export const walletKindAtom = atom({
  key: 'walletKindAtom',
  default: null,
});

export const isLikeAtom = atom({
  key: 'isLikeAtom',
  default: false,
});

export const displayNameAtom = atom({
  key: 'displayName',
  default: '',
});

export const userInfoAtom = atom({
  key: 'userInfo',
  default: { username: '', email: '', haveProfileURL: false },
});

export const hasSignupStarted = atom({
  key: 'hasSignupStarted',
  default: false,
});

export const isLoginedAtom = atom({
  key: 'isLogined',
  default: false,
});