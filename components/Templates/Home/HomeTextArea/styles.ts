import { BACKGROUND_COLOR, FONT_COLOR, POINT_COLOR } from '@/constants/color';
import { Z_INDEX_LEVEL } from '@/constants/zIndex';
import { mq } from '@/styles/mediaQuery';
import { css } from '@emotion/react';

export const textareaContainer = css`
  position: relative;
`;
export const reviewedTabList = ({ selectedTab }: { selectedTab: 'MEMO' | 'REVIEW' }) => css`
  display: flex;
  margin-bottom: 8px;
  button {
    padding: 16px 24px;
    border-bottom: 3px solid #1e252f;
  }
  .review {
    border-bottom: 3px solid ${selectedTab === 'REVIEW' ? POINT_COLOR.MAIN : '#1e252f'};
  }
  .memo {
    border-bottom: 3px solid ${selectedTab === 'MEMO' ? POINT_COLOR.MAIN : '#1e252f'};
  }
`;

export const reviewContainer = css`
  background-color: ${BACKGROUND_COLOR.NAVY_3};
  border-radius: 12px;
  padding: 20px 24px;
`;

export const reviewDate = css`
  min-width: 300px;
`;
export const reviewTabContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 12px;
  padding-left: 8px;
  overflow: hidden;

  ${mq('desktop')} {
    flex-direction: row;
    align-items: center;
    gap: unset;
    margin-bottom: 9px;
  }
`;

export const categoryWrapper = css`
  width: 100%;
  > div {
    overflow-x: auto;
    overflow-y: hidden;
  }
`;
export const scroller = css`
  display: flex;
  > button {
    width: 100%;
    word-wrap: normal;
    white-space: nowrap;
  }
`;
export const questionContainer = css`
  padding-left: 8px;
  margin-bottom: 8px;
`;
export const questionListContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;

  ${mq('desktop')} {
    flex-direction: row;
    gap: 6px;
  }
`;
export const questionItemContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
  textarea {
    resize: none;
    min-height: 148px;
    color: ${FONT_COLOR.GRAY_3};
    font-size: 12px;
    line-height: 18px;
    background-color: ${BACKGROUND_COLOR.NAVY_4};
    border-radius: 6px;
    padding: 24px 20px 16px 20px;
    white-space: pre-wrap;

    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    :read-only {
      cursor: not-allowed;
    }
  }
`;
export const questionTitle = css`
  padding-left: 8px;
`;

export const reviewButtonContainer = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
  gap: 16px;
`;

export const checkboxContainer = css`
  display: flex;
  align-items: center;
  gap: 4px;
  user-select: none;
  cursor: pointer;
`;
export const memoTextarea = css`
  width: 100%;
  min-height: 216px;
  resize: none;

  background-color: ${BACKGROUND_COLOR.NAVY_3};
  color: ${FONT_COLOR.WHITE};
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);

  padding: 28px 24px 40px;

  white-space: pre-wrap;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  :read-only {
    cursor: not-allowed;
  }
  ::placeholder {
    color: ${FONT_COLOR.GRAY_2};
    font-size: 14px;
    line-height: 22px;
    font-family: 'Pretendard';
  }

  &:focus {
    border: 1px solid rgba(255, 255, 255, 0.06);
  }
`;

export const memoTextareaBottomContainer = () => css`
  position: absolute;
  bottom: 20px;
  right: 26px;
`;
