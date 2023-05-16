import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putMyNotificationAPI } from 'apis/alarm';

export const useUpdateMyNotification = () => {
  const queryClient = useQueryClient();
  return useMutation(putMyNotificationAPI, {
    onSuccess: () => {
      alert('선택 정보가 저장되었습니다.');
      // TODO queryClient.invalidateQuery([...])/
    },
    onError: (e) => {
      alert(e);
    },
  });
};
