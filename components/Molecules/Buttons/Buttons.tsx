import { IconFloat } from '@/assets/svgs/IconFloat';
import { IconGoogle } from '@/assets/svgs/IconGoogle';
import { IconKakao } from '@/assets/svgs/IconKakao';
import { IconPlus } from '@/assets/svgs/IconPlus';

import { Button } from '@/components/Atom/Button';
import * as Typo from '@/components/Typography';
import * as Styled from './styles';

// 쓰이는 버튼들 정의 필요
// 근데 이렇게 하나하나 다 정의하다보면 의미가 있나..?
// 애매..

export const FloatingButton = () => {
  return (
    <Button types='float'>
      <IconFloat></IconFloat>
    </Button>
  );
};

export const KakaoLoginButton = () => {
  return (
    <Button types='x-lg' backgroundColor='#FDDC3F'>
      <Styled.LoginBtnWrapper>
        <IconKakao></IconKakao>
        <Typo.H1>카카오 로그인</Typo.H1>
      </Styled.LoginBtnWrapper>
    </Button>
  );
};

export const KakaoLoginMButton = () => {
  return (
    <Button types='x-lg-m' backgroundColor='#FDDC3F'>
      <Styled.LoginBtnWrapper>
        <IconKakao></IconKakao>
        <Typo.H1>카카오 로그인</Typo.H1>
      </Styled.LoginBtnWrapper>
    </Button>
  );
};

export const GoogleLoginButton = () => {
  return (
    <Button types='x-lg' backgroundColor='#FFFFFF'>
      <Styled.LoginBtnWrapper>
        <IconGoogle></IconGoogle>
        <Typo.H1>Google 로그인</Typo.H1>
      </Styled.LoginBtnWrapper>
    </Button>
  );
};

export const GoogleLoginMButton = () => {
  return (
    <Button types='x-lg-m' backgroundColor='#FFFFFF'>
      <Styled.LoginBtnWrapper>
        <IconGoogle></IconGoogle>
        <Typo.H1>Google 로그인</Typo.H1>
      </Styled.LoginBtnWrapper>
    </Button>
  );
};

export const LargeButton = () => {
  return (
    <Button types='lg' color='#22FFA2'>
      <Styled.LargeButtonWrapper>
        <IconPlus></IconPlus>
        <Typo.H2 color='#343B43'>새 탭을 열 때 마다 브릭로그를 확인해보세요</Typo.H2>
      </Styled.LargeButtonWrapper>
    </Button>
  );
};

export const LargeButtonDisabled = () => {
  return (
    <Button types='lg' backgroundColor='rgba(255, 255, 255, 0.1)'>
      <Styled.LargeButtonWrapper>
        <IconPlus fill={'#636C78'} stroke={'#636C78'}></IconPlus>
        <Typo.H2 color='#636C78'>새 탭을 열 때 마다 브릭로그를 확인해보세요</Typo.H2>
      </Styled.LargeButtonWrapper>
    </Button>
  );
};

export const MediumButton = () => {
  return (
    <Button types='md'>
      <Typo.Label1>내 블로그 인증</Typo.Label1>
    </Button>
  );
};

export const MediumButtonDisabled = () => {
  return (
    <Button types='md' backgroundColor='rgba(255, 255, 255, 0.1)'>
      <Typo.Label1 color='#636C78'>내 블로그 인증</Typo.Label1>
    </Button>
  );
};

export const SmallButton = () => {
  return (
    <Button types='sm'>
      <Typo.Label1>등록</Typo.Label1>
    </Button>
  );
};

export const SmallButtonDisabled = () => {
  return (
    <Button types='sm' backgroundColor='rgba(255, 255, 255, 0.1)'>
      <Typo.Label1 color='#636C78'>등록</Typo.Label1>
    </Button>
  );
};

export const LargeMobileButton = () => {
  return (
    <Button types='x-lg-m'>
      <Typo.H2>선택 완료</Typo.H2>
    </Button>
  );
};
