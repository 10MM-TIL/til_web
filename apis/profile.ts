import { devError } from '@/utils/system';
import { MyUserModel, ServerResponse } from '../types';
import instance from './instance';

export const getMyUserAPI = async () => {
  try {
    const { data } = await instance.get<MyUserModel>('/my/user');

    return data;
  } catch (e) {
    devError('getMyUserAPI error ', e);
    throw e;
  }
};

export const postMyProfileOnboardingAPI = async ({
  categoryIdentifier,
  mailAgreement,
}: {
  categoryIdentifier: string;
  mailAgreement: boolean;
}) => {
  try {
    const res: ServerResponse<{ isSuccess: boolean }> = await instance.post('/my/profile/onboarding', {
      categoryIdentifier,
      mailAgreement,
    });

    return res;
  } catch (e) {
    devError('getMyUserAPI error ', e);
    throw e;
  }
};
