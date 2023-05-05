import { useEffect, useState, SetStateAction, Dispatch } from 'react';

const useLocalStorage = <S>(key: string, initialState?: S | (() => S)): [S, Dispatch<SetStateAction<S>>] => {
  const [state, setState] = useState<S>(initialState as S);

  // next에서는 useEffect에서 가져와야함
  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item) setState(parse(item));
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      console.log('local 저장');
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state]);

  return [state, setState];
};

const parse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export default useLocalStorage;
