import instance from './instance';
import { ServerResponse, SignInModel } from '../types';
import { recommandPostItem, allPostItem } from '@/types/cardview';

type fetchRecommandPostsRequest = {
  identifier: string;
};
type fetchRecommandPostsResponse = {
  posts: recommandPostItem[];
  size: number;
};

type fetchAllPostsRequest = {
  identifier?: string;
  size: number;
  pageToken?: string;
};
export type fetchAllPostsResponse = {
  posts: allPostItem[];
  size: number;
  nextPageToken: string;
};

// 카테고리별 포스트 리스트 요청
export const fetchAllPosts = async (category?: string, pageToken: string = '') => {
  const params: fetchAllPostsRequest = pageToken
    ? { identifier: category, size: 3 * 5, pageToken }
    : { identifier: category, size: 3 * 5 };
  try {
    const { data } = await instance.get<fetchAllPostsResponse>('/post/category', {
      params,
    });
    return data;
  } catch (e: unknown) {
    throw e;
  }
};

// 카테고리별 추천 포스트 리스트 요청
export const fetchRecommandPosts = async (category: string) => {
  const params: fetchRecommandPostsRequest | null = category ? { identifier: category } : null;
  try {
    const { data } = await instance.get<fetchRecommandPostsResponse>('/post/category/recommend', {
      params,
    });
    return data;
  } catch (e: unknown) {
    throw e;
  }
};
