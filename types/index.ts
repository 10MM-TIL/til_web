import { CategoryQueryKeys } from '@/components/Atom/Card/types';
import { categories } from '@/types/cardview';
export interface ServerResponse<T> {
  data: T;
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
  categoryIdentifier: CategoryQueryKeys;
  categoryName?: string;
  introduction: string;
  mailAgreement: boolean;
  name: string;
  path: string;
  profileImgSrc: string;
  email: string;
  oauthType: string;
}

export interface CategoryModel {
  categories: categories[];
}
