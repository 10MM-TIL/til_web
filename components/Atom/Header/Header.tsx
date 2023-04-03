import * as Styled from './styles';
import * as Typo from '@/components/Atom/Typography';
import { HeaderProps } from './types';
import { FONT_COLOR, POINT_COLOR } from '@/constants/color';
import { memo } from 'react';
import { IconBrickLog } from '@/assets/svgs/IconBrickLog';
import { IconShortCut } from '@/assets/svgs/IconShorCut';
import { Button } from '@/components/Atom/Button';

import Link from 'next/link';

const Header = ({ isLogin }: HeaderProps) => {
  // TODO 추후 버튼 동작 및 로그인 관련 기능 추가 필요
  const onClickLogin = () => {
    console.log('로그인!');
  };
  return (
    <Styled.HeaderContainer>
      <Styled.HeaderLeft>
        <Link href={''}>
          <IconBrickLog></IconBrickLog>
        </Link>
        <Link href={''}>
          <Typo.H1 color={FONT_COLOR.GRAY_2}>마이 페이지</Typo.H1>
        </Link>
      </Styled.HeaderLeft>
      {isLogin ? (
        <Styled.HeaderRight>
          <button>
            <IconShortCut></IconShortCut>
          </button>
          <Link href={''}>
            <Styled.ProfileIcon></Styled.ProfileIcon>
          </Link>
        </Styled.HeaderRight>
      ) : (
        <Button size='sm' backgroundColor={POINT_COLOR.MAIN} onClick={onClickLogin}>
          로그인
        </Button>
      )}
    </Styled.HeaderContainer>
  );
};

export default memo(Header);
