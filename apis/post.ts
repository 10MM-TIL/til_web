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

export const postPostUploadRequestAPI = async ({ url }: { url: string }) => {
  try {
    const res = await instance.post(`/post/upload/request`, { url });

    return res;
  } catch (e) {
    devError('postPostUploadRequestAPI error ', e);
    throw e;
  }
};

export const postPostUploadConfirmAPI = async ({
  url,
  title,
  summary,
  createdAt,
}: {
  url: string;
  title: string;
  summary: string;
  createdAt: string;
}) => {
  try {
    const res = await instance.post(`/post/upload/confirm`, { url, title, summary, createdAt });

    return res;
  } catch (e) {
    devError('postPostUploadConfirmAPI error ', e);
    throw e;
  }
};

