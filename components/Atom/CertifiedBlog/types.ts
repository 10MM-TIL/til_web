import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export type CertifiedBlogProps = {
  blogName: string;
  isDeleted: boolean;
  onDeleteBlog: () => void;
  setBlogUrl: Dispatch<SetStateAction<string>>;
};

// export type blogType = 'GitHub' | 'Naver' | 'Tistory' | 'Velog' | 'Personal';
// export type ImageTypeObject = {
//   [K in blogType]: BlogImageObject;
// };

export type BlogImageObject = {
  width: number;
  height: number;
  src: string;
};
