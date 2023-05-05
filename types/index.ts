export interface ServerResponse<T> {
  data?: T;
  status?: number;
}

export interface ErrorModel {
  // TODO 적용 어떻게 해야 하는지 고민하기
  description: string;
}

export interface SignInModel {
  accessToken: string;
  refreshToken: string;
}

export interface MyUserModel {
  name: string;
  profileImgSrc: string;
  introduction: string;
  categoryId: string;
  isAuthorized: boolean;
}

export interface CategoryModel {
  categories: {
    identifier: string;
    name: string;
  }[];
}
