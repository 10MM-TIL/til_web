import { devError } from '@/utils/system';
import { CategoryModel, ServerResponse } from '../types';
import instance from './instance';

export const getCategoriesAPI = async () => {
  try {
    const { data } = await instance.get<CategoryModel>('/categories');

    return data;
  } catch (e) {
    devError('getCategoriesAPI error ', e);
    throw e;
  }
};
