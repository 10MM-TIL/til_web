import { ChangeEvent } from 'react';

export type CertifiedBlogProps = {
  blogName: string;
  // blogType: blogType;
  isDeleted: boolean;
  onDeleteBlog: () => void;
  id: number;
  onChange: (url: string, id: number) => void;
  // onChange: (id: number) => void;
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
