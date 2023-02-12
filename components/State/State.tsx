import { css } from '@emotion/react';
import IconCheckBig from 'public/svgs/IconCheckBig';
import IconError from 'public/svgs/IconError';
import IconSaving from 'public/svgs/IconSaving';

import * as Typo from '@/components/Typography';
import { POINT_COLOR } from '@/constants/color';

interface StateProps {
  state: 'checked' | 'saving' | 'error';
}

const State = ({ state }: StateProps) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      {state === 'checked' ? <IconCheckBig /> : state === 'saving' ? <IconSaving /> : <IconError />}
      <Typo.Body color={state === 'error' ? POINT_COLOR.ERROR : POINT_COLOR.SAVE}>
        {state === 'checked' ? '저장됨' : state === 'saving' ? '작성중' : '저장불가'}
      </Typo.Body>
    </div>
  );
};

export default State;
