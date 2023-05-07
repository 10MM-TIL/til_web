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

export const getUserTimeline = async (path: string, size: number) => {
  try {
    const params = { size: size };
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
