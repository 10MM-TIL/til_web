import { ChangeEvent, ReactElement } from 'react';
import { CertifiedBlogContainer, CertifiedBlogName, DeleteButton, InputField } from './styles';
import { CertifiedBlogProps } from './types';
import { IconX } from '@/assets/svgs/iconX';

import BlogIcon from '@/components/Atom/BlogIcon';

export const CertifiedBlog = ({ id, blogName, onDeleteBlog, setBlogUrl }: CertifiedBlogProps): ReactElement => {
  const handleChangeBlogUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setBlogUrl(id, e.target.value);
  };

  return (
    <>
      <CertifiedBlogContainer>
        <BlogIcon url={blogName} />
        <CertifiedBlogName>
          <InputField value={blogName} onChange={(e) => handleChangeBlogUrl(e)} />
        </CertifiedBlogName>
        <DeleteButton onClick={() => onDeleteBlog(id)}>
          <IconX onClick={() => onDeleteBlog(id)} />
        </DeleteButton>
      </CertifiedBlogContainer>
    </>
  );
};
