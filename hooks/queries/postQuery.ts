import { postPostUploadConfirmAPI, postPostUploadRequestAPI } from '@/apis/post';
import { useMutation } from '@tanstack/react-query';

export const usePostUploadRequest = () => {
  return useMutation(postPostUploadRequestAPI);
};

export const usePostUploadConfirm = () => {
  return useMutation(postPostUploadConfirmAPI);
};
