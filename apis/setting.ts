import { devError } from '@/utils/system';
import instance from './instance';

export const getMyProfile = async () => {
  try {
    const res = await instance.get(`/my/user`);

    return res.data;
  } catch (e) {
    devError('getMyProfilAPI error', e);
    throw e;
  }
};

export const putMyProfile = async ({
  name,
  path,
  introduction,
  categoryIdentifier,
  mailAgreement,
  profileImgSrc,
  blogs,
}: {
  name: string;
  path: string;
  introduction: string;
  categoryIdentifier: string;
  mailAgreement: boolean;
  profileImgSrc: string;
  blogs: Array<{ url: string }>;
}) => {
  try {
    const res = await instance.put('/my/profile', {
      name,
      path,
      introduction,
      categoryIdentifier,
      mailAgreement,
      profileImgSrc,
      blogs,
    });
    return res;
  } catch (e) {
    devError('putMyProfileAPI error ', e);
    throw e;
  }
};

export const getMyNotification = async () => {
  try {
    const res = await instance.get(`/my/notification`);

    return res.data;
  } catch (e) {
    devError('getMyNotificationAPI error', e);
    throw e;
  }
};

export const putMyNotification = async ({ enable, iteration }: { enable: boolean; iteration: string }) => {
  try {
    const res = await instance.put(`/my/notification`, {
      enable,
      iteration,
    });
    return res;
  } catch (e) {
    devError('putMyNotificationAPI error', e);
    throw e;
  }
};

export const putMyBlog = async (blogs: { url: string }[]) => {
  try {
    const res = await instance.put('/blogs', { blogs });

    return res;
  } catch (e) {
    devError('putMyBlogAPI error', e);
    throw e;
  }
};

export const refresh = async () => {
  try {
    const res = await instance.get(`/auth/refresh`);

    return res;
  } catch (e) {}
};
// export const updateMyProfile = async (putData: {
//   categoryIdentifier: string;
//   introduction: string;
//   name: string;
//   path: string;
//   mailAgreement: boolean;
// }) => {
//   try {
//     const { categoryIdentifier, introduction, name, path, mailAgreement } = putData;
//     await axios.put('http://152.69.231.228:8080' + '/v1/my/profile', {
//       categoryIdentifier: categoryIdentifier,
//       introduction: introduction,
//       name: name,
//       path: path,
//       mailAgreement: mailAgreement,
//     });
//   } catch (e) {}
// };
