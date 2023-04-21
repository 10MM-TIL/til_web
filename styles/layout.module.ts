import styled from '@emotion/styled';
import { mq } from './mediaQuery';
import { BACKGROUND_COLOR } from '@/constants/color';
import { CSSProperties, CSSObject } from '@emotion/serialize';

// 현재 데스크탑 > 모바일인데 좀더 세분화가 필요해보임 많이 어색함
export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 23px 0 24px;
  position: relative;
  background-color: ${BACKGROUND_COLOR.NAVY_1};
  height: 100%;
`;

export const InnerContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const GridContainer = styled.div<{
  rowGap?: CSSProperties['rowGap'];
  colGap?: CSSProperties['columnGap'];
  tabletColums?: CSSProperties['gridTemplateColumns'];
  desktopColums?: CSSProperties['gridTemplateColumns'];
  css?: CSSObject;
}>`
  display: grid;
  justify-content: center;
  height: fit-content;

  row-gap: ${({ rowGap }) => rowGap ?? '12px'}; // 행사이의 간격
  column-gap: ${({ colGap }) => colGap ?? '8px'}; // 열사이의 간격
  width: 100%;
  grid-template-columns: repeat(1, 100%);

  @media screen and (min-width: 780px) {
    // 그리드 col을 어떤식으로 설정할지
    grid-template-columns: ${({ tabletColums }) => tabletColums};
  }

  ${mq('desktop')} {
    grid-template-columns: ${({ desktopColums }) => desktopColums};
  }

  ${({ css }) => css}
`;
