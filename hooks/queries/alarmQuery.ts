import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putMyNotificationAPI } from 'apis/alarm';

export const useUpdateMyNotification = () => {
  const queryClient = useQueryClient();
  return useMutation(putMyNotificationAPI, {
    onSuccess: () => {
      // TODO queryClient.invalidateQuery([...])/
    },
    onError: (e) => {
      alert(e);
    },
  });
};
