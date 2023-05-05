import { devError } from '@/utils/system';
import { CategoryModel, ServerResponse } from '../types';
import instance from './instance';

export const getCategoriesAPI = async () => {
  try {
    const res: ServerResponse<CategoryModel> = await instance.get('/categories');

    return res;
  } catch (e) {
    devError('getCategoriesAPI error ', e);
    throw e;
  }
};
