import { useState, ChangeEventHandler, useRef, useEffect, SyntheticEvent, ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Link from 'next/link';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { LoginModalState } from '@/stores/modalStateStore';
import { AuthState } from '@/stores/authStateStore';

import { useMyDraft, useMyDraftSync } from '@/hooks/queries/draftQuery';
import { usePostUploadConfirm, usePostUploadRequest } from '@/hooks/queries/postQuery';
import useToast from '@/hooks/useToast';

import { FONT_COLOR, POINT_COLOR } from '@/constants/color';

import * as Typo from '@/components/Atom/Typography';
import { H1 } from '@/components/Atom/Typography';
import { Button } from '@/components/Atom/Button';
import State from '@/components/Atom/State';
import Spinner from '@/components/Atom/Spinner';
import BlogIcon from '@/components/Atom/BlogIcon';

import { IconCalendar } from '@/assets/svgs/IconCalendar';
import IconCheckBig from '@/assets/svgs/IconCheckBig';
import IconError from '@/assets/svgs/IconError';

import * as Styled from './styles';
import RadioGroup from '@/components/Molecules/RadioGroup';
import CheckboxLabel from '@/components/Molecules/CheckboxLabel';
import Checkbox from '@/components/Atom/Checkbox';

type HomeTextAreaProps = {
  showToast: (text: ReactNode) => void;
  userInfo: any;
};

const REVIEW_CATEGORY = [
  { name: '랜덤 질문', identifier: '1' },
  { name: '하루 회고', identifier: '2' },
  { name: '공부 일지', identifier: '3' },
  { name: '감정 일기', identifier: '4' },
  { name: '아이더이 기록', identifier: '5' },
  { name: '스크랩', identifier: '6' },
];

const questionList = ['아쉬웠던 점', '어떤 하루를 보냈나요?', '어떤 하루를 보냈나요?'];
const HomeReviewTextArea = () => {
  const [selectedReviewCategory, setSelectedReviewCategory] = useState('1');
  const { isLogin } = useRecoilValue(AuthState);
  const setIsLoginModalOpen = useSetRecoilState(LoginModalState);
  const [checked, setChecked] = useState(false);
  const onClickReviewCategory = (identifier: string) => {
    setSelectedReviewCategory(identifier);
  };
  const onClickReview = () => {};
  const handleCheckboxClick = () => {
    setChecked(!checked);
  };
  return (
    <>
      <section css={Styled.reviewContainer}>
        <div css={Styled.reviewTabContainer}>
          <Typo.Body color={FONT_COLOR.GRAY_2}>{format(new Date(), 'yyyy년 M월 d일 EEEE', { locale: ko })}</Typo.Body>
          <div>
            <RadioGroup data={REVIEW_CATEGORY} selectedId={selectedReviewCategory} onClick={onClickReviewCategory} />
          </div>
        </div>
        <div css={Styled.questionContainer}>
          <Typo.H2 color={FONT_COLOR.WHITE}>
            {REVIEW_CATEGORY.find((category) => category.identifier === selectedReviewCategory)?.name ||
              REVIEW_CATEGORY[0].name}
          </Typo.H2>
        </div>
        <div css={Styled.questionListContainer}>
          {questionList.map((question, index) => {
            return (
              <div key={question + index} css={Styled.questionItemContainer}>
                <div css={Styled.questionTitle}>
                  <Typo.Body color={FONT_COLOR.GRAY_3}>
                    Q{index + 1}. {question}
                  </Typo.Body>
                </div>
                <textarea
                  onClick={(e) => {
                    if (!isLogin) {
                      e.currentTarget.blur();
                      setIsLoginModalOpen({ isLoginModalOpen: true });
                    }
                  }}
                ></textarea>
              </div>
            );
          })}
        </div>

        <div css={Styled.reviewButtonContainer}>
          <div css={Styled.checkboxContainer} onClick={handleCheckboxClick}>
            <Checkbox checked={checked} />
            <Typo.Label2 color={checked ? FONT_COLOR.GRAY_3 : FONT_COLOR.GRAY_2}>비공개</Typo.Label2>
          </div>
          <Button size='sm' onClick={onClickReview}>
            <Typo.Label1>등록</Typo.Label1>
          </Button>
        </div>
      </section>
    </>
  );
};

const HomeMemoTextArea = () => {
  const queryClient = useQueryClient();
  const [memoValue, setMemoValue] = useState('');
  const setIsLoginModalOpen = useSetRecoilState(LoginModalState);
  const { isLogin } = useRecoilValue(AuthState);
  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);
  const [typingState, setTypingState] = useState<'' | 'checked' | 'saving' | 'error'>('checked');
  const { data } = useMyDraft({ isLogin });
  const { mutateAsync: memoMutate } = useMyDraftSync();

  useEffect(() => {
    if (data) setMemoValue(data.data);
  }, [data]);

  const handleMemoChange: ChangeEventHandler<HTMLTextAreaElement> = async (e) => {
    setTypingState('saving');
    setMemoValue(e.currentTarget.value);
    // 이전의 타이머를 초기화합니다.
    if (typingTimer) {
      clearTimeout(typingTimer);
    }
    // 5초 후에 입력이 없으면 처리를 마무리합니다.
    const newTypingTimer = setTimeout(() => {
      memoMutate(
        { data: e.target.value },
        {
          onSuccess: () => {
            setTypingState('checked');
            queryClient.invalidateQueries(['MY_DRAFT']);
          },
          onError: () => setTypingState('error'),
        },
      );
    }, 5000);

    setTypingTimer(newTypingTimer);
  };

  return (
    <>
      <textarea
        placeholder={'잊지 말아야 할 것들을 메모해보세요.'}
        value={memoValue}
        css={Styled.memoTextarea}
        onChange={handleMemoChange}
        onClick={(e) => {
          if (!isLogin) {
            e.currentTarget.blur();
            setIsLoginModalOpen({ isLoginModalOpen: true });
          }
        }}
      />
      {memoValue.length > 0 && (
        <div css={Styled.memoTextareaBottomContainer}>{typingState !== '' && <State state={typingState} />}</div>
      )}
    </>
  );
};

const HomeTextArea = ({ showToast, userInfo }: HomeTextAreaProps) => {
  const queryClient = useQueryClient();
  const setIsLoginModalOpen = useSetRecoilState(LoginModalState);
  const { isLogin } = useRecoilValue(AuthState);
  //   const { showToast } = useToast();

  const titleRef = useRef<HTMLInputElement>(null);
  const [isUrlLoading, setIsUrlLoading] = useState(false);
  const [validUrlStatus, setValidUrlStatus] = useState<'BEFORE' | 'INVALID' | 'VALID'>('BEFORE');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [date, setDate] = useState<string>('');

  const { mutateAsync: uploadRequestMutate } = usePostUploadRequest();
  const { mutateAsync: uploadConfirmMutate } = usePostUploadConfirm();

  const [selectedTab, setSelectedTab] = useState<'MEMO' | 'REVIEW'>('REVIEW'); // * MEMO & REVIEW

  const [url, setUrl] = useState('');

  const onTabChange = (type: 'MEMO' | 'REVIEW') => {
    setSelectedTab(type);
  };

  return (
    <div>
      <div css={Styled.textareaContainer}>
        <div css={Styled.reviewedTabList({ selectedTab })}>
          <button type='button' className='review' onClick={() => onTabChange('REVIEW')}>
            <Typo.H1 color={selectedTab === 'MEMO' ? '#636C78' : FONT_COLOR.WHITE}>회고</Typo.H1>
          </button>
          <button type='button' className='memo' onClick={() => onTabChange('MEMO')}>
            <Typo.H1 color={selectedTab === 'MEMO' ? FONT_COLOR.WHITE : '#636C78'}>메모</Typo.H1>
          </button>
        </div>
        {selectedTab === 'MEMO' ? <HomeMemoTextArea></HomeMemoTextArea> : <HomeReviewTextArea></HomeReviewTextArea>}
      </div>
    </div>
  );
};

export default HomeTextArea;
