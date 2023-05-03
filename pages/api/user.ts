import axios from 'axios';
import { getMyProfileResponse, getBlogResponse } from '@/types/user';

export const getMyProfile = async () => {
  try {
    const params = { userIdentifier: '11111111-1111-4837-8804-f0e1180c5bf5' };
    const response = await axios.get<getMyProfileResponse>('http://152.69.231.228:8080' + '/v1/my/user', { params });

    return response.data;
  } catch (e) {}
};

export const getMyBlog = async (path: string) => {
  try {
    const response = await axios.get<getBlogResponse[]>(`http://152.69.231.228:8080/v1/blogs/${path}`);

    return response.data;
  } catch (e) {}
};

export const getMyCategory = async () => {};

export const getMyTimeline = async (path: string, size: number) => {
  try {
    const params = { size: size };
    const response = await axios.get(`http://152.69.231.228:8080/v1/post/user/${path}`, { params });

    return response.data;
  } catch (e) {}
};

export const getMyGrass = async (path: string, from: number, to: number) => {
  try {
    const params = { from: from, to: to };
    const response = await axios.get(`http://152.69.231.228:8080/v1/post/user/${path}/meta`, { params });

    return response.data;
  } catch (e) {}
};
