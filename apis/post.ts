import { devError } from '@/utils/system';
import instance from './instance';

export const getPostUserPathMetaAPI = async ({ path }: { path: string }) => {
  try {
    const res = await instance.get(`/post/user/${path}/meta`);

    return res;
  } catch (e) {
    devError('getPostUserPathMetaAPI error ', e);
    throw e;
  }
};
