import { ChangeEvent, ReactElement, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { CertifiedBlogContainer, CertifiedBlogName, DeleteButton, InputField } from './styles';
import * as Typo from '@/components/Atom/Typography';
import { CertifiedBlogProps } from './types';
import { IconX } from '@/assets/svgs/iconX';
import { FONT_COLOR } from '@/constants/color';
import BlogIcon from '@/components/Atom/BlogIcon';

export const CertifiedBlog = ({ blogName, isDeleted, onDeleteBlog, setBlogUrl }: CertifiedBlogProps): ReactElement => {
  const handleChangeBlogUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setBlogUrl(e.target.value);
  };
  // const handleChangeBlogUrl = useCallback(
  //   (e: ChangeEvent<HTMLInputElement>, id: number) => {
  //     const nextValue = e.target.value;
  //     onChange(nextValue, id);
  //     setBlogUrl(nextValue);
  //   },
  //   [onChange],
  // );

  return (
    <>
      {!isDeleted ? (
        <CertifiedBlogContainer>
          <BlogIcon url={blogName} />
          <CertifiedBlogName>
            <InputField value={blogName} onChange={(e) => handleChangeBlogUrl(e)} />
          </CertifiedBlogName>
          <DeleteButton onClick={onDeleteBlog}>
            <IconX />
          </DeleteButton>
        </CertifiedBlogContainer>
      ) : null}
    </>
  );
};
