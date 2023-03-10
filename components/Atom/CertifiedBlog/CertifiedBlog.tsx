import { ReactElement } from 'react';
import Image from 'next/image';
import { CertifiedBlogContainer, CertifiedBlogName, DeleteButton } from './styles';
import * as Typo from '@/components/Typography';
import { CertifiedBlogProps, ImageTypeObject } from './types';
import { IconX } from '@/assets/svgs/iconX';
import { FONT_COLOR } from '@/constants/color';

// 이미지 추가 및 허용된 블로그만 설정 필요
export const imageType: ImageTypeObject = {
  GitHub: {
    width: 25,
    height: 25,
    src: require('@/assets/images/github.png'),
  },
  Naver: {
    width: 25,
    height: 25,
    src: '',
  },
  Tistory: {
    width: 25,
    height: 25,
    src: '',
  },
  Velog: {
    width: 25,
    height: 25,
    src: '',
  },
  Personal: {
    width: 50,
    height: 50,
    src: '',
  },
};

export const CertifiedBlog = ({ blogName, blogType, isDeleted, onDeleteBlog }: CertifiedBlogProps): ReactElement => {
  return (
    <>
      {!isDeleted ? (
        <CertifiedBlogContainer>
          <Image
            src={imageType[blogType].src}
            alt={blogType}
            width={imageType[blogType].width}
            height={imageType[blogType].height}
          ></Image>
          <CertifiedBlogName>
            <Typo.Body color={FONT_COLOR.WHITE}>{blogName}</Typo.Body>
          </CertifiedBlogName>
          <DeleteButton onClick={onDeleteBlog}>
            <IconX></IconX>
          </DeleteButton>
        </CertifiedBlogContainer>
      ) : null}
    </>
  );
};
