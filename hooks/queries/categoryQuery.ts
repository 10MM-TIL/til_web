import { useQuery } from '@tanstack/react-query';
import { getCategoriesAPI } from 'apis/category';

export const useCategories = () => {
  return useQuery(['CATEGORIES'], getCategoriesAPI, { onError: (e) => alert(e) });
};
