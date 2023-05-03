export interface getMyProfileResponse {
  name: string;
  path: string;
  profileImgSrc: string;
  introduction: string;
  categoryId: string;
  isAuthorized: boolean;
}

export interface getBlogResponse {
  identifier: string;
  url: string;
}
