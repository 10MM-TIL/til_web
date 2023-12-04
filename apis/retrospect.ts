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

type RetrospectContentsType = {
  isSecret: boolean;
  id: string;
  createdAt: string;
  qna: Retrospect;
};

export type RetrospectType = {
  size: number;
  nextPageToken: string;
  retrospects: RetrospectContentsType[];
};
export const getRetrospectByPath = async (path: string, pageToken: string = '', from?: number, to?: number) => {
  try {
    const params = pageToken ? { size: 5, pageToken, from, to } : { size: 5, from, to };
    const { data } = await instance.get<RetrospectType>(`/retrospect/${path}`, { params });

    return data;
  } catch (e) {
    devError('getRetrospectByPath error ', e);
    throw e;
  }
};

export const deleteRetrospect = async ({ retorspectIdentifier }: { retorspectIdentifier: string }) => {
  try {
    const res = await instance.delete(`/retrospect/${retorspectIdentifier}`);

    return res;
  } catch (e) {
    devError('deleteRetrospectAPI error', e);
    throw e;
  }
};
