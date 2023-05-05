export type CertifiedBlogProps = {
  id: string;
  blogName: string;
  onDeleteBlog: (id: string) => void;
  setBlogUrl: (id: string, url: string) => void;
};

export type BlogImageObject = {
  width: number;
  height: number;
  src: string;
};
