import { useMutation, useQuery } from '@tanstack/react-query';
import { getMyRetrospect, postMyRetrospect } from '@/apis/retrospect';

export const useMyRetrospect = () => {
  return useQuery(['MY_RETROSPECT'], getMyRetrospect);
};

export const usePostMyRetrospect = () => {
  return useMutation(postMyRetrospect);
};
