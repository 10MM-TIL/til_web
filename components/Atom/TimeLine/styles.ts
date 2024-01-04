import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { CSSProperties } from '@emotion/serialize';
import { BACKGROUND_COLOR, POINT_COLOR, FONT_COLOR } from '@/constants/color';
import { mq } from '@/styles/mediaQuery';

export const TimeLineContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-width: 284px;

  background: ${BACKGROUND_COLOR.NAVY_3};
  border-radius: 6px;
  padding: 20px 16px 20px 24px;
`;

export const TimeLineContent = styled.div<{ isEdit: boolean }>`
  /* cursor: ${(props) => (props.isEdit ? `default` : `pointer`)}; */
  // input max-width, min-width 적용
  > div:first-of-type {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    ${mq('desktop')} {
      max-width: 100%;
    }
  }
  > svg {
    min-width: 37px;
  }
`;
export const TimeLineDate = styled.div`
  margin-bottom: 8px;
`;

export const TimeLineSaveButton = styled.button`
  position: absolute;
  top: 10px;
  right: 40px;
`;
export const TimeLineCancelButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const timeLineBodyCss = ({ width }: { width: CSSProperties['width'] }) => css`
  /* cursor: pointer; */
  p,
  H1,
  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  span {
    display: block;
  }
  ${mq('desktop')} {
    width: ${width}px;
  }
`;

export const TimeLineTitle = styled.div`
  ${() => timeLineBodyCss({ width: 340 })}
  margin-bottom: 6px;
`;

export const TimeLineDesc = styled.div`
  ${() => timeLineBodyCss({ width: 480 })}
`;

export const TimeLineImage = styled.div`
  > img {
    min-width: 37px;
    height: 37px;
    border-radius: 50%;
  }
`;

const inputCss = ({
  width,
  height,
  fontWeight,
  fontSize,
  lineHeight,
  color,
}: {
  width: CSSProperties['width'];
  height: CSSProperties['height'];
  fontWeight: CSSProperties['fontWeight'];
  fontSize: CSSProperties['fontSize'];
  lineHeight: CSSProperties['lineHeight'];
  color: CSSProperties['color'];
}) => css`
  display: inline-block;
  width: ${width};
  height: ${height};
  background-color: transparent;
  border-bottom: 2px solid ${BACKGROUND_COLOR.FIELD_10};
  font-weight: ${fontWeight};
  font-size: ${fontSize}px;
  line-height: ${lineHeight}px;
  color: ${color};
  margin-right: 0px;
  ${mq('desktop')} {
    margin-right: 6px;
  }

  &:focus {
    border-bottom: 2px solid ${POINT_COLOR.MAIN};
  }
`;

export const TimeLineTitleInput = styled.input`
  ${inputCss({
    width: 'calc(100% - 50px)',
    height: '100%',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 24,
    color: FONT_COLOR.WHITE,
  })}
`;

export const TimeLineDescInput = styled.input`
  ${inputCss({
    width: 'calc(100% - 50px)',
    height: '100%',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 16,
    color: FONT_COLOR.GRAY_3,
  })}
`;

export const TimeLineInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${mq('desktop')} {
    padding-right: 0px;
  }
`;

export const TimeLineTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  margin-bottom: 6px;
`;

export const TimeLineDescWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 19px;
`;

export const QuestionCategory = styled.div`
  margin-bottom: 8px;
`;
export const AnswerListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;

  ${mq('desktop')} {
    flex-direction: row;
    gap: 6px;
  }
`;
export const AnswerItemContainer = styled.div`
  width: 232px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;

  min-height: 148px;
  color: ${FONT_COLOR.GRAY_3};
  font-size: 12px;
  line-height: 18px;
  white-space: pre-wrap;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const QuestionTitle = styled.div`
  padding-left: 8px;
`;

export const AnswerContents = styled.div`
  background-color: ${BACKGROUND_COLOR.NAVY_4};
  padding: 24px 20px 16px 20px;
  height: 148px;
  border-radius: 6px;
`;
