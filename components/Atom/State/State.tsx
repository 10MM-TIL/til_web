import { css } from '@emotion/react';

import * as Typo from '@/components/Atom/Typography';
import { POINT_COLOR } from '@/constants/color';
import IconCheckBig from '@/assets/svgs/IconCheckBig';
import IconError from '@/assets/svgs/IconError';
import IconSaving from '@/assets/svgs/IconSaving';

interface StateProps {
  state: 'checked' | 'saving' | 'error';
}

const State = ({ state }: StateProps) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 2px;
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
