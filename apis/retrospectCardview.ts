import instance from './instance';

type RetrospectItem = {
  isSecret: boolean;
  retrospectIdentifier: string;
  userName: string;
  userPath: string;
  categoryIdentifier: string;
  categoryName: string;
  createdAt: string;
  questionType: string;
  questionTypeName: string;
  qna: Array<{ questionName: string; answer: string }>;
};

type RecommendRetrospectRequest = {
  categoryIdentifier: string;
};

type RetrospectCardParamType = {
  size: number;
  categoryIdentifier?: string;
  pageToken?: string;
};
type RetrospectCardResponse = {
  size: number;
  nextPageToken: string;
  retrospects: RetrospectItem[];
};

export const fetchRetrospectCards = async (category?: string, pageToken: string = '') => {
  const params: RetrospectCardParamType = pageToken
    ? {
        categoryIdentifier: category,
        size: 3 * 5,
        pageToken,
      }
    : {
        categoryIdentifier: category,
        size: 3 * 5,
      };

  try {
    const { data } = await instance.get<RetrospectCardResponse>('/retrospect/category', {
      params,
    });

    return data;
  } catch (e: unknown) {
    throw e;
  }
};

export const fetchRecommendRetrospectCards = async (category: string) => {
  const params: RecommendRetrospectRequest | null = category ? { categoryIdentifier: category } : null;
  try {
    const { data } = await instance.get<RetrospectCardResponse>('/retrospect/category/recommend', {
      params,
    });

    return data;
  } catch (e: unknown) {
    throw e;
  }
};
