import { devError } from '@/utils/system';
import instance from './instance';

type MyQuestionResponse = {
  types: Array<{ questionType: string; questionTypeName: string; isRandom: boolean }>;
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
  questionType: string;
  questionTypeName: string;
  isRandom: boolean;
  question: Array<{ questionName: string }>;
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

export const getRandomQuestionType = async () => {
  try {
    const { data } = await instance.get<MyQuestionResponse>(`/question/randomQuestionType`);

    return data;
  } catch (e) {
    devError('getRandomQuestionType', e);
    throw e;
  }
};
