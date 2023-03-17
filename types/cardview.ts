export type categoriesResponse = {
  categories: categories[];
};

export type categories = {
  identifier: string;
  name: string;
  selected?: boolean;
};

export type recommandPostResponse = {
  postList: recommandPostList[];
  size: number;
};

export type recommandPostList = {
  categoryIdentifier: string;
  createdAt: string;
  description: string;
  hitCount: number;
  identifier: string;
  title: string;
  url: string;
  userIdentifier: string;
};

export type allPostResponse = {
  postList: allPostList[];
  size: number;
  nextPageToken: string;
};

export type allPostList = {
  categoryIdentifier: string;
  createdAt: string;
  description: string;
  hitCount: number;
  identifier: string;
  title: string;
  url: string;
  userIdentifier: string;
};
