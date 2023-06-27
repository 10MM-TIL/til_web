export interface getMyProfileResponse {
  name: string;
  path: string;
  profileImgSrc: string;
  introduction: string;
  categoryIdentifier: string;
  categoryName: string;
  isAuthorized: boolean;
}

export interface getBlogResponse {
  identifier: string;
  url: string;
}

export interface getTimelineResponse {
  identifier: string;
  userPath: string;
  categoryIdentifier: string;
  title: string;
  summary: string;
  url: string;
  createdAt: string;
  hitCount: number;
}
