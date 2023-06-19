import instance from './instance';
import { ServerResponse, SignInModel } from '../types';
import { categories, recommandPostItem, allPostItem } from '@/types/cardview';
type fetchCategoriesResponse = {
  categories: categories[];
};

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
    const response: ServerResponse<fetchAllPostsResponse> = await instance.get('/post/category', {
      params,
    });
    return response.data;
  } catch (e: unknown) {
    throw e;
  }
};

// 카테고리별 추천 포스트 리스트 요청
export const fetchRecommandPosts = async (category: string) => {
  const params: fetchRecommandPostsRequest | null = category ? { identifier: category } : null;
  try {
    const response: ServerResponse<fetchRecommandPostsResponse> = await instance.get('/post/category/recommend', {
      params,
    });
    return response.data;
  } catch (e: unknown) {
    throw e;
  }
};
