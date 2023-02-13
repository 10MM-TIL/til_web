import type { NextPage } from 'next';
import * as Typo from '../components/Typography';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from '@/components/Button';
import { IconFloat } from '@/assets/svgs/IconFloat';
import { IconGoogle } from '@/assets/svgs/IconGoogle';
import { IconKakao } from '@/assets/svgs/IconKakao';
import { IconPlus } from '@/assets/svgs/IconPlus';

const Test: NextPage = () => {
  // !! Color관련 ThemeProvider 적용할건지 여부
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
      <ButtonComponent></ButtonComponent>
    </div>
  );
};

const ButtonComponent = () => {
  const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  `;
  const FloatingButton = () => {
    return (
      <Button types='float'>
        <IconFloat></IconFloat>
      </Button>
    );
  };
  const Loginbutton = () => {
    const GoogleBtnWrapper = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
    `;
    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 6px;
        `}
      >
        <Button types='x-lg' backgroundColor='#FFFFFF'>
          <GoogleBtnWrapper>
            <IconGoogle></IconGoogle>
            <Typo.H1>Google 로그인</Typo.H1>
          </GoogleBtnWrapper>
        </Button>
        <Button types='x-lg' backgroundColor='#FDDC3F'>
          <GoogleBtnWrapper>
            <IconKakao></IconKakao>
            <Typo.H1>카카오 로그인</Typo.H1>
          </GoogleBtnWrapper>
        </Button>
      </div>
    );
  };
  const Loginbutton_M = () => {
    const GoogleBtnWrapper = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 6px;
    `;

    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 6px;
        `}
      >
        <Button types='x-lg-m' backgroundColor='#FFFFFF'>
          <GoogleBtnWrapper>
            <IconGoogle></IconGoogle>
            <Typo.H1>Google 로그인</Typo.H1>
          </GoogleBtnWrapper>
        </Button>
        <Button types='x-lg-m' backgroundColor='#FDDC3F'>
          <GoogleBtnWrapper>
            <IconKakao></IconKakao>
            <Typo.H1>카카오 로그인</Typo.H1>
          </GoogleBtnWrapper>
        </Button>
      </div>
    );
  };
  const LargeButton = () => {
    const LargeButtonWrapper = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 6px;
    `;

    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 6px;
        `}
      >
        <Button types='lg' color='#22FFA2'>
          <LargeButtonWrapper>
            <IconPlus></IconPlus>
            <Typo.H2 color='#343B43'>새 탭을 열 때 마다 브릭로그를 확인해보세요</Typo.H2>
          </LargeButtonWrapper>
        </Button>
        <Button types='lg' backgroundColor='rgba(255, 255, 255, 0.1)'>
          <LargeButtonWrapper>
            <IconPlus fill={'#636C78'} stroke={'#636C78'}></IconPlus>
            <Typo.H2 color='#636C78'>새 탭을 열 때 마다 브릭로그를 확인해보세요</Typo.H2>
          </LargeButtonWrapper>
        </Button>
      </div>
    );
  };
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: flex-start;
        background-color: #1b222c;
        padding: 50px;
        gap: 10px;
        color: white;
      `}
    >
      <h1>
        <strong>Button 컴포넌트</strong>
      </h1>
      <Wrapper>
        <h3>Floating Button</h3>
        <FloatingButton></FloatingButton>
      </Wrapper>
      <Wrapper>
        <h3>Login Button_Large</h3>
        <Loginbutton></Loginbutton>
      </Wrapper>
      <Wrapper>
        <h3>Login Button_Medium_Mobile</h3>
        <Loginbutton_M></Loginbutton_M>
      </Wrapper>
      <Wrapper>
        <h3>Large</h3>
        <LargeButton></LargeButton>
      </Wrapper>
      <Wrapper>
        <h3>Medium</h3>
        <Button types='md'>
          <Typo.Label1>내 블로그 인증</Typo.Label1>
        </Button>
        <Button types='md' backgroundColor='rgba(255, 255, 255, 0.1)'>
          <Typo.Label1 color='#636C78'>내 블로그 인증</Typo.Label1>
        </Button>
      </Wrapper>{' '}
      <Wrapper>
        <h3>Small</h3>
        <Button types='sm'>
          <Typo.Label1>등록</Typo.Label1>
        </Button>
        <Button types='sm' backgroundColor='rgba(255, 255, 255, 0.1)'>
          <Typo.Label1 color='#636C78'>등록</Typo.Label1>
        </Button>
      </Wrapper>
      <Wrapper>
        <h3>Large Mobile</h3>
        <Button types='x-lg-m'>
          <Typo.H2>선택 완료</Typo.H2>
        </Button>
      </Wrapper>
    </div>
  );
};

export default Test;
