export interface GetResponse<T> {
  data: T;
  status: number;
}

// Post API Response interface
export interface PostResponse<T> {
  data?: T;
  status?: number;
}

export interface SignInModel {
  accessToken: string;
  refreshToken: string;
}
