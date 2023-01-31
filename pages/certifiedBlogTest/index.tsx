import type { NextPage } from 'next';
import { css } from '@emotion/react';

import { CertifiedBlog } from '@/components/CertifiedBlog';
import { useState } from 'react';
const CertifiedBlogTest: NextPage = () => {
  const [isDeleted1, setDeleted1] = useState(false);
  const [isDeleted2, setDeleted2] = useState(false);
  const handleDeleteButton1 = () => {
    // 특정 조건 이후 없어져야함
    console.log('blog1 삭제 Post API 전송');
    setTimeout(() => {
      console.log('blog1 삭제 완료');
      setDeleted1(true);
    }, 2000);
  };
  const handleDeleteButton2 = () => {
    // 특정 조건 이후 없어져야함
    console.log('blog1 삭제 Post API  전송');
    setTimeout(() => {
      console.log('blog2 삭제 완료');
      setDeleted2(true);
    }, 2000);
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;

        width: 100%;
        height: 100%;
        justify-content: center;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 10px;
        `}
      >
        <CertifiedBlog
          blogName={'github.exaple.com/example1'}
          blogType={'GitHub'}
          isDeleted={isDeleted1}
          onDeleteBlog={handleDeleteButton1}
        />
        <CertifiedBlog
          blogName={'github.exaple.com/example2'}
          blogType={'GitHub'}
          isDeleted={isDeleted2}
          onDeleteBlog={handleDeleteButton2}
        />
      </div>
      <div
        css={css`
          display: flex;
          height: 500px;
          justify-content: center;
        `}
      ></div>
    </div>
  );
};

export default CertifiedBlogTest;
