import { devError } from '@/utils/system';
import instance from './instance';

type MyRetrospect = {
  type: string;
  retrospectIdentifier: string;
  retrospect: Retrospect;
};
export const getMyRetrospect = async () => {
  try {
    const { data } = await instance.get<Array<MyRetrospect>>(`/my/retrospect`);

    return data;
  } catch (e) {
    devError('getMyRetrospect error ', e);
    throw e;
  }
};

export type Retrospect = Array<{ question: string; answer: string }>;

type PostMyRetrospectRequest = {
  isSecret: boolean;
  type: string;
  retrospect: Retrospect;
};
export const postMyRetrospect = async (payload: PostMyRetrospectRequest) => {
  try {
    const { data } = await instance.post(`/my/retrospect`, { ...payload });

    return data;
  } catch (e) {
    devError('postMyRetrospect error ', e);
    throw e;
  }
};
