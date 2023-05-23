import { devError } from '@/utils/system';
import { getMyProfileResponse, getBlogResponse } from '@/types/user';
import instance from './instance';

export const getUserProfile = async (path: string) => {
  try {
    const res = await instance.get(`/user/${path}`);

    return res.data;
  } catch (e) {
    devError('getUserProfilAPI error', e);
    throw e;
  }
};

export const getUserBlog = async (path: string) => {
  try {
    const res = await instance.get(`/blogs/${path}`);

    return res.data;
  } catch (e) {
    devError('getUserBlogAPI error', e);
    throw e;
  }
};

export const getUserTimeline = async (path: string, pageToken: string = '', from?: number, to?: number) => {
  try {
    const params = pageToken ? { size: 5, pageToken, from, to } : { size: 5, from, to };
    const res = await instance.get(`/post/user/${path}`, { params });
    return res.data;
  } catch (e) {
    devError('getUserTimelineAPI error', e);
    throw e;
  }
};

export const getUserGrass = async (path: string, from: number, to: number) => {
  try {
    const params = { from: from, to: to };
    const res = await instance.get(`/post/user/${path}/meta`, { params });
    // const response = await axios.get(`http://152.69.231.228:8080/v1`, { params });

    return res.data;
  } catch (e) {
    devError('getUserGrassAPI error', e);
    throw e;
  }
};

export const putEditTimeline = async ({
  postIdentifier,
  editedContent,
}: {
  postIdentifier: string;
  editedContent: {};
}) => {
  try {
    const params = { ...editedContent };
    const res = await instance.put(`/post/${postIdentifier}`, { ...editedContent });

    return res;
  } catch (e) {
    devError('putEditTimelineAPI error', e);
    throw e;
  }
};

export const deleteTimeline = async ({ postIdentifier }: { postIdentifier: string }) => {
  try {
    const res = await instance.delete(`/post/${postIdentifier}`);

    return res;
  } catch (e) {
    devError('deleteTimelineAPI error', e);
    throw e;
  }
};
