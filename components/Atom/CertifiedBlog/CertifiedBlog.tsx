import { ChangeEvent, ReactElement, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { CertifiedBlogContainer, CertifiedBlogName, DeleteButton, InputField } from './styles';
import * as Typo from '@/components/Atom/Typography';
import { CertifiedBlogProps } from './types';
import { IconX } from '@/assets/svgs/iconX';
import { FONT_COLOR } from '@/constants/color';
import BlogIcon from '@/components/Atom/BlogIcon';

// 이미지 추가 및 허용된 블로그만 설정 필요
// export const imageType: ImageTypeObject = {
//   GitHub: {
//     width: 25,
//     height: 25,
//     src: require('@/assets/images/github.png'),
//   },
//   Naver: {
//     width: 25,
//     height: 25,
//     src: '',
//   },
//   Tistory: {
//     width: 25,
//     height: 25,
//     src: '',
//   },
//   Velog: {
//     width: 25,
//     height: 25,
//     src: '',
//   },
//   Personal: {
//     width: 50,
//     height: 50,
//     src: '',
//   },
// };

export const CertifiedBlog = ({
  blogName,
  // blogType,
  isDeleted,
  onDeleteBlog,
  id,
  onChange,
}: CertifiedBlogProps): ReactElement => {
  const [blogUrl, setBlogUrl] = useState(blogName);
  const handleChangeBlogUrl = useCallback(
    (e: ChangeEvent<HTMLInputElement>, id: number) => {
      const nextValue = e.target.value;
      onChange(nextValue, id);
      setBlogUrl(nextValue);
    },
    [onChange],
  );

  return (
    <>
      {!isDeleted ? (
        <CertifiedBlogContainer>
          <BlogIcon url={blogUrl} />
          <CertifiedBlogName>
            {/* <Typo.Body color={FONT_COLOR.WHITE}>{blogName}</Typo.Body> */}
            <InputField onChange={(e) => handleChangeBlogUrl(e, id)} />
          </CertifiedBlogName>
          <DeleteButton onClick={onDeleteBlog}>
            <IconX />
          </DeleteButton>
        </CertifiedBlogContainer>
      ) : null}
    </>
  );
};
