import type { NextPage } from 'next';
import { useState } from 'react';
import { css } from '@emotion/react';
import * as Typo from '@/components/Typography';
import Toggle from '@/components/Toggle';
import { CertifiedBlog } from '@/components/CertifiedBlog';

const Test: NextPage = () => {
  // !! Color관련 ThemeProvider 적용할건지 여부

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
    <div>
      <div>컴포넌트를 위한 테스트 페이지입니다.</div>
      <Typo.H1>Header 1</Typo.H1>
      <Typo.H1 color='#FF0000'>Header 1</Typo.H1>
      <Typo.H2>Header 2</Typo.H2>
      <Typo.H2 color='blue'>Header 2</Typo.H2>
      <Typo.SubHeader>Subheadline</Typo.SubHeader>
      <Typo.SubHeader color='orange'>Subheadline</Typo.SubHeader>
      <Typo.Body>Body</Typo.Body>
      <Typo.Body color='aqua'>Body</Typo.Body>
      <Typo.Label1>Label1</Typo.Label1>
      <br />
      <Typo.Label1 color='green'>Label1</Typo.Label1>
      <br />
      <Typo.Label1>Label2</Typo.Label1>
      <br />
      <Typo.Label1 color='violet'>Label2</Typo.Label1>
      <br />
      <Toggle />

      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 10px;
        `}
      >
        <h1>
          <strong>인증된 블로그 컴포넌트</strong>
        </h1>
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
    </div>
  );
};

export default Test;
