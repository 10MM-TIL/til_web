import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putMyProfile } from 'apis/setting';

export const usePutMyProfile = () => {
  const queryClient = useQueryClient();

  return useMutation(putMyProfile, {
    onSuccess: () => {
      alert('저장');
      queryClient.invalidateQueries(['PUT_MYPROFILE']);
    },
  });
};
