import { devError } from '@/utils/system';
import instance from './instance';

type MyRetrospect = {
  questionType: string;
  questionTypeName: string;
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

export type Retrospect = Array<{ questionName: string; answer: string }>;

type PostMyRetrospectRequest = {
  isSecret: boolean;
  questionType: string;
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
  retrospectIdentifier: string;
  userName: string;
  userPath: string;
  categoryIdentifier: string;
  categoryName: string;
  createdAt: string;
  questionType: string;
  questionTypeName: string;
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
    const res = await instance.delete(`/my/retrospect/${retorspectIdentifier}`);

    return res;
  } catch (e) {
    devError('deleteRetrospectAPI error', e);
    throw e;
  }
};
//
type getRetrospectByCategoryRequestType = {
  size: number;
  retrospectType: string;
  pageToken?: string;
};
// 카테고리별 회고 리스트 요청
export const getRetrospectByCategory = async (retrospectType: string, pageToken: string = '') => {
  const params: getRetrospectByCategoryRequestType = pageToken
    ? {
        retrospectType,
        size: 3 * 5,
        pageToken,
      }
    : {
        retrospectType,
        size: 3 * 5,
      };
  try {
    const { data } = await instance.get<RetrospectType>('/retrospect/category', {
      params,
    });

    return data;
  } catch (e) {
    throw e;
  }
};
// 카테고리별 추천 회고 리스트 요청
export const getRecommendRetrospectByCategory = async (retrospectType: string) => {
  const params: { retrospectType: string } | null = retrospectType ? { retrospectType } : null;

  try {
    const { data } = await instance.get<RetrospectType>('/retrospect/category/recommend', {
      params,
    });
    return data;
  } catch (e: unknown) {
    throw e;
  }
};
