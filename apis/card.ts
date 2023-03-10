import axios from 'axios';

type fetchCategoryResquest = {};
type fetchCategoryResponse = {};

// 카테고리 목록 조회
export const fetchCategory = async () => {
  try {
    const response = axios.get<fetchCategoryResquest, fetchCategoryResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    );
    return response;
  } catch (e: unknown) {
    throw e;
  }
};

type fetchPopularCardResquest = {};
type fetchPopularCardResponse = {};

// 추천 포스트 조회
export const fetchPopularCard = async () => {
  try {
    const response = axios.get<fetchPopularCardResquest, fetchPopularCardResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/post/recommendation`,
    );
    return response;
  } catch (e: unknown) {
    throw e;
  }
};

type fetchCardByCategorydResquest = {};
type fetchCardByCategoryResponse = {};

// 카테고리별 포스트 조회
export const fetchCardByCategory = async ({ categoryId }: { categoryId: string }) => {
  try {
    const response = axios.get<fetchCardByCategorydResquest, fetchCardByCategoryResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/post/category/${categoryId}`,
    );
    return response;
  } catch (e: unknown) {
    throw e;
  }
};
