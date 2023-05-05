import * as Typo from '@/components/Atom/Typography';
import { css } from '@emotion/react';
import { BACKGROUND_COLOR, FONT_COLOR, POINT_COLOR } from '@/constants/color';
import { useResize } from '@/hooks/useResize';
import { Button } from '@/components/Atom/Button';
import { IconPlus } from '@/assets/svgs/IconPlus';
import { ChangeEventHandler, memo, useState } from 'react';
import IconCheckBig from '@/assets/svgs/IconCheckBig';
import State from '@/components/Atom/State';

const HomePage = () => {
  const device = useResize();

  const [selectedTab, setSelectedTab] = useState<'MEMO' | 'REVIEW'>('MEMO'); // * MEMO & REVIEW
  const [typingState, setTypingState] = useState<'' | 'checked' | 'saving' | 'error'>('checked');

  const [memoValue, setMemoValue] = useState('');
  const [reviewValue, setReviewValue] = useState('');

  const handleTabChange = (type: 'MEMO' | 'REVIEW') => {
    setSelectedTab(type);
  };

  const handleMemoChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setTypingState('saving');

    // TODO 쓰로틀링
    setMemoValue(e.currentTarget.value);

    setTimeout(() => {
      setTypingState('checked');
    }, 2000);
  };

  const handleReviewChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setReviewValue(e.currentTarget.value);
  };

  return (
    <>
      <div
        css={css`
          display: flex;
          justify-content: center;
          position: relative;
          padding-top: 38px;
          height: 300px;
        `}
      >
        <div
          css={css`
            position: absolute;
            width: 100%;
            height: 300px;
            left: 0;
            top: 0;
            background-image: url('/images/background.png');

            background-position: center;
          `}
        ></div>

        <div
          css={css`
            z-index: 2; // TODO Z-Index 관련 정리
            padding-top: 35px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 46px;
          `}
        >
          <Typo.Title lineHeight='150%' color={FONT_COLOR['WHITE']}>
            꾸준한 회고와 기록을 통해 <br /> 매일 성장하세요
          </Typo.Title>

          <Button size={device === 'mobile' ? 'x-lg-m' : 'lg'} backgroundColor={BACKGROUND_COLOR.FIELD_10} gap={'6px'}>
            <IconPlus width='20' height='20' fill={FONT_COLOR.GRAY_4} stroke={FONT_COLOR.GRAY_4} />
            <Typo.H2 color={FONT_COLOR.GRAY_4}>새 탭을 열 때마다 브릭로그를 확인해보세요</Typo.H2>
          </Button>
        </div>
      </div>
      <div
        css={css`
          padding: 84px 24px;
        `}
      >
        <div>
          {selectedTab === 'MEMO' ? (
            <div
              css={css`
                position: relative;
              `}
            >
              <div
                css={css`
                  position: absolute;
                  top: -40px;
                  left: 0;

                  background-color: ${BACKGROUND_COLOR.NAVY_3};
                  border-radius: 12px;
                  border-bottom-left-radius: 0;
                  border-bottom-right-radius: 0;
                  border: 1px solid rgba(255, 255, 255, 0.06);
                  border-bottom: 0;

                  width: 90px;
                  height: 41px;
                  z-index: 10;
                  display: flex;
                  justify-content: center;
                  padding: 11px 30px;
                `}
              >
                <Typo.H1 color={FONT_COLOR.WHITE}>메모</Typo.H1>
              </div>
              <div
                css={css`
                  position: absolute;
                  top: -40px;
                  left: 72px;
                  background-color: ${BACKGROUND_COLOR.NAVY_2};
                  color: ${FONT_COLOR.WHITE};
                  border-radius: 12px;
                  border-bottom-right-radius: 0;

                  width: 98px;
                  height: 40px;
                  z-index: 5;
                  display: flex;
                  justify-content: center;
                  padding: 11px 30px 0 40px;
                `}
                onClick={() => handleTabChange('REVIEW')}
              >
                <Typo.H1 color='#636C78'>회고</Typo.H1>
              </div>
              <textarea
                placeholder='잊지 말아야 할 것들을 메모해보세요.'
                value={memoValue}
                css={css`
                  width: 100%;
                  min-height: 216px;
                  resize: none;

                  z-index: 100 !important;
                  background-color: ${BACKGROUND_COLOR.NAVY_3};
                  color: ${FONT_COLOR.WHITE};
                  border-radius: 12px;
                  border-top-left-radius: 0;
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

                  &:focus {
                    border: 1px solid rgba(255, 255, 255, 0.06);
                  }
                `}
                onChange={handleMemoChange}
              />
              {typingState !== '' && (
                <div
                  css={css`
                    position: absolute;
                    bottom: 16px;
                    right: 136px;
                  `}
                >
                  <State state={typingState} />
                </div>
              )}
            </div>
          ) : (
            <div
              css={css`
                position: relative;
              `}
            >
              <div
                css={css`
                  position: absolute;
                  top: -40px;
                  left: 0;

                  background-color: ${BACKGROUND_COLOR.NAVY_2};
                  border-radius: 12px;
                  border-bottom-left-radius: 0;
                  border-bottom-right-radius: 0;

                  width: 90px;
                  height: 40px;
                  z-index: 5;
                  display: flex;
                  justify-content: center;
                  padding: 11px 30px;
                `}
                onClick={() => handleTabChange('MEMO')}
              >
                <Typo.H1 color='#636C78'>메모</Typo.H1>
              </div>
              <div
                css={css`
                  position: absolute;
                  top: -40px;
                  left: 78px;
                  background-color: ${BACKGROUND_COLOR.NAVY_3};
                  color: ${FONT_COLOR.WHITE};
                  border: 1px solid rgba(255, 255, 255, 0.06);
                  border-bottom: 0;
                  border-radius: 12px;
                  border-bottom-right-radius: 0;
                  border-bottom-left-radius: 0;

                  width: 90px;
                  height: 41px;
                  z-index: 10;
                  display: flex;
                  justify-content: center;
                  padding: 11px 30px;
                `}
              >
                <Typo.H1 color={FONT_COLOR.WHITE}>회고</Typo.H1>
              </div>
              <textarea
                placeholder='잊지 말아야 할 것들을 메모해보세요.'
                value={reviewValue}
                css={css`
                  width: 100%;
                  min-height: 216px;
                  resize: none;

                  background-color: ${BACKGROUND_COLOR.NAVY_3};
                  color: ${FONT_COLOR.WHITE};
                  border-radius: 12px;
                  border-top-left-radius: 0;
                  border: 1px solid rgba(255, 255, 255, 0.06);

                  padding: 28px 28px 20px;

                  white-space: pre-wrap;

                  -ms-overflow-style: none;
                  scrollbar-width: none;
                  &::-webkit-scrollbar {
                    display: none;
                  }

                  :read-only {
                    cursor: not-allowed;
                  }

                  &:focus {
                    border: 1px solid rgba(255, 255, 255, 0.06);
                  }
                `}
                onChange={handleReviewChange}
              />

              <div
                css={css`
                  position: absolute;
                  bottom: 20px;
                  right: 26px;
                `}
              >
                <Button size='sm'>등록</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
