import axios, { AxiosResponse } from 'axios';
import { categories, recommandPostList, allPostList } from '@/types/cardview';
type fetchCategoriesResponse = {
  categories: categories[];
};

type fetchRecommandPostsRequest = {
  identifier: string;
};
type fetchRecommandPostsResponse = {
  postList: recommandPostList[];
  size: number;
};

type fetchAllPostsRequest = {
  identifier?: string;
  size: number;
  pageToken?: string;
};
type fetchAllPostsResponse = {
  postList: allPostList[];
  size: number;
  nextPageToken: string;
};

// 카테고리별 포스트 리스트 요청
export const fetchAllPosts = async (category: string, pageToken: string) => {
  const params: fetchAllPostsRequest = pageToken
    ? { identifier: category, size: 3 * 5, pageToken }
    : { identifier: category, size: 3 * 5 };
  try {
    const response = await axios.get<fetchAllPostsResponse>('/v1/post/category', {
      params,
    });
    return response.data;
  } catch (e: unknown) {
    throw e;
  }
};

// 카테고리별 추천 포스트 리스트 요청
export const fetchRecommandPosts = async (category: string) => {
  const params: fetchRecommandPostsRequest = { identifier: category };
  try {
    const response = await axios.get<fetchRecommandPostsResponse>('/v1/post/category/recommend', {
      params,
    });
    return response.data;
  } catch (e: unknown) {
    throw e;
  }
};

// 전체 카테고리 가져오기
export const fetchCategories = async () => {
  try {
    const response = await axios.get<fetchCategoriesResponse>('/v1/categories');
    return response.data;
  } catch (e: unknown) {
    throw e;
  }
};
