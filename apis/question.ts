import { devError } from '@/utils/system';
import instance from './instance';

type MyQuestionResponse = {
  types: Array<{ type: string; name: string }>;
};
export const getMyQuestion = async () => {
  try {
    const { data } = await instance.get<MyQuestionResponse>(`/question`);

    return data;
  } catch (e) {
    devError('getMyQuestionAPI error ', e);
    throw e;
  }
};

type QuestionResponse = {
  type: string;
  question: Array<{ name: string }>;
};
export const getQuestionType = async ({ questionType }: { questionType: string }) => {
  try {
    const { data } = await instance.get<QuestionResponse>(`/question/${questionType}`);
    return data;
  } catch (e) {
    devError('getQuestionTypeAPI error ', e);
    throw e;
  }
};
