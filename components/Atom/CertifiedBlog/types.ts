export type CertifiedBlogProps = {
  blogName: string;
  blogType: blogType;
  isDeleted: boolean;
  onDeleteBlog: () => void;
};

export type blogType = 'GitHub' | 'Naver' | 'Tistory' | 'Velog' | 'Personal';
export type ImageTypeObject = {
  [K in blogType]: BlogImageObject;
};

export type BlogImageObject = {
  width: number;
  height: number;
  src: string;
};
