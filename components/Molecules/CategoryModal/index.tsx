import Modal from '@/components/Atom/Modal';
import RadioGroup from '@/components/Molecules/RadioGroup';
import Toggle from '@/components/Toggle';
import CheckboxLabel from '@/components/Molecules/CheckboxLabel';
import { Button } from '@/components/Atom/Button';

import * as Typo from '@/components/Atom/Typography';
import { BACKGROUND_COLOR, FONT_COLOR } from '@/constants/color';
import { css } from '@emotion/react';
import { mq } from '@/styles/mediaQuery';
import { useResize } from '@/hooks/useResize';
import { useState } from 'react';

interface CategoryModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

const CategoryModal = ({ isOpen, onClose = () => {} }: CategoryModalProps) => {
  const device = useResize();

  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [isAlertAgree, setIsAlertAgree] = useState(true);
  const [frequency, setFrequency] = useState(0);

  const handleIsAlertAgreeToggle = () => setIsAlertAgree((prev) => !prev);

  return (
    <Modal closable={false} isOpen={isOpen} onClose={onClose}>
      <form
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 16px;
          `}
        >
          <Typo.Title>관심 카테고리 선택</Typo.Title>
          <Typo.Body color={FONT_COLOR.GRAY_2}>내 직군과 관심분야가 비슷한 사람들의 회고를 확인해보세요</Typo.Body>
        </div>
        <div
          css={css`
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
          `}
        >
          <Typo.H1>분야</Typo.H1>
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              flex-wrap: wrap;
              width: 190px;

              ${mq('desktop')} {
                width: auto;
              }
            `}
          >
            <RadioGroup
              data={[
                { id: 0, text: '#개발' },
                { id: 1, text: '#디자인' },
                { id: 2, text: '#기획' },
                { id: 3, text: '#마케팅' },
                { id: 4, text: '#기업/스타트업' },
              ]}
              selectedId={selectedCategoryId}
              onClick={setSelectedCategoryId}
            />
          </div>
        </div>
        <div
          css={css`
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
          `}
        >
          <Typo.H1>알림설정</Typo.H1>
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
            `}
          >
            <Toggle isOn={isAlertAgree} onIsOnToggle={handleIsAlertAgreeToggle} />
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: center;
              `}
            >
              <RadioGroup
                data={[
                  { id: 0, text: '매달' },
                  { id: 1, text: '매주' },
                  { id: 2, text: '매일' },
                ]}
                selectedId={frequency}
                onClick={setFrequency}
              />
            </div>
          </div>
        </div>
        <div
          css={css`
            padding: 16px 0 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
          `}
        >
          <CheckboxLabel text='마케팅 활용 및 뉴스레터 수신 동의' checked={true} onClick={() => console.log(1)} />
          <Typo.Label2 color={FONT_COLOR.GRAY_2}>브릭로그와 관련된 유용한 정보를 받아보실 수 있습니다.</Typo.Label2>
        </div>
        <Button size={device === 'mobile' ? 'x-lg-m' : 'lg'}>
          <Typo.H2 color={'black'}>선택 완료</Typo.H2>
        </Button>
      </form>
    </Modal>
  );
};

export default CategoryModal;
