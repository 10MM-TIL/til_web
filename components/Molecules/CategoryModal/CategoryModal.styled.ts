import { BACKGROUND_COLOR } from '@/constants/color';
import { mq } from '@/styles/mediaQuery';
import { css } from '@emotion/react';

const form = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const titleContainer = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const categoryContainer = css`
  margin-top: 24px;
  background-color: ${BACKGROUND_COLOR.NAVY_2};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px 0;
  border-radius: 12px;
  width: 328px;
  gap: 16px;

  ${mq('desktop')} {
    width: 500px;
  }
`;

const categoryRadioContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 190px;

  ${mq('desktop')} {
    width: auto;
  }
`;

const alertContainer = css`
  margin-top: 8px;
  background-color: ${BACKGROUND_COLOR.NAVY_2};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px 0;
  border-radius: 12px;
  width: 328px;
  gap: 16px;

  ${mq('desktop')} {
    width: 500px;
  }
`;

const alertRadioContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const alertRadioRow = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const agreeContainer = css`
  padding: 16px 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const styles = {
  form,
  titleContainer,
  categoryContainer,
  categoryRadioContainer,
  alertContainer,
  alertRadioContainer,
  alertRadioRow,
  agreeContainer,
};

export default styles;
