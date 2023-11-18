import { useState, ChangeEventHandler, useRef, useEffect, SyntheticEvent, ReactNode, FormEvent } from 'react';
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
import { useMyQuestion, useQuestionType } from '@/hooks/queries/questionQuery';
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
import { useMyRetrospect, usePostMyRetrospect } from '@/hooks/queries/retrospectQuery';
import { Retrospect } from '@/apis/retrospect';
import ScrollContainer from 'react-indiana-drag-scroll';
import ToastMessage from '@/components/ToastMessage';
import Modal from '@/components/Atom/Modal';

type HomeTextAreaProps = {
  showToast: (text: ReactNode) => void;
  userInfo: any;
};

const HomeReviewTextArea = () => {
  const querClient = useQueryClient();
  const { isOpen, showToast, text } = useToast();
  const [errorText, setErrorText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReviewCategory, setSelectedReviewCategory] = useState('');
  const { mutateAsync: postMyRetrospect } = usePostMyRetrospect();
  // const { data: myRetrospect, isSuccess: isMyRetrospectFetchSuccess } = useMyRetrospect();
  const { data: questionList, isSuccess: isMyQuestionFetchSuccess } = useMyQuestion();
  const { data: selectedQuestionList, isSuccess: isQuestionTypeFetchSuccess } = useQuestionType({
    questionType: selectedReviewCategory,
  });
  const { isLogin } = useRecoilValue(AuthState);
  const setIsLoginModalOpen = useSetRecoilState(LoginModalState);
  const [checked, setChecked] = useState(false);
  const [retrospect, setRetrospect] = useState<Retrospect>([]);

  useEffect(() => {
    if (isQuestionTypeFetchSuccess) {
      setRetrospect(selectedQuestionList.question.map((questionItem) => ({ question: questionItem.name, answer: '' })));
    }
  }, [isQuestionTypeFetchSuccess, selectedQuestionList?.question]);

  // 질문 리스트 클릭
  const onClickReviewCategory = (identifier: string) => {
    setSelectedReviewCategory(identifier);
  };

  const checkReviewisSelected = () => {
    if (
      retrospect.findIndex((restrospectItem) => {
        if (restrospectItem.answer.trim().length <= 0) return true;
      }) !== -1
    ) {
      setErrorText('회고를 빈칸없이 모두 입력해주세요.');
      return true;
    }
  };
  // 등록 버튼 클릭
  const onClickReview = () => {
    if (checkReviewisSelected()) return;
    setIsModalOpen(true);
  };

  const registerReview = async () => {
    await postMyRetrospect(
      { isSecret: checked, type: selectedReviewCategory, retrospect: retrospect },
      {
        onSuccess: () => {
          querClient.invalidateQueries(['MY_RETROSPECT']);
          showToast(<Typo.H1 color={FONT_COLOR.WHITE}>회고 등록이 완료되었습니다.</Typo.H1>);
        },
        onError: (e) => {
          const Error = e as { errorCode: string; description: string };
          setErrorText(Error.description);
        },
      },
    );
    setIsModalOpen(false);
    setRetrospect((prevRetrospect) => {
      return prevRetrospect.map((prev) => ({ question: prev.question, answer: '' }));
    });
  };

  const handleCheckboxClick = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (isMyQuestionFetchSuccess) setSelectedReviewCategory(questionList?.types[0].type);
  }, [isMyQuestionFetchSuccess, questionList?.types]);

  const handleClickClose = () => {
    setIsModalOpen(false);
  };

  const onInputRetrospect = (event: FormEvent<HTMLTextAreaElement>, question: string) => {
    setErrorText('');
    const value = event.currentTarget.value;

    setRetrospect((prevRetrospect) => {
      // 이전 상태를 기반으로 새로운 배열을 생성
      return prevRetrospect.map((item) => {
        // 질문이 일치하면 해당 아이템을 업데이트
        if (item.question === question) {
          return { ...item, answer: value };
        }
        return item;
      });
    });
  };

  return (
    <>
      {isMyQuestionFetchSuccess && (
        <section css={Styled.reviewContainer}>
          <div css={Styled.reviewTabContainer}>
            <Typo.Body css={Styled.reviewDate} color={FONT_COLOR.GRAY_2}>
              {format(new Date(), 'yyyy년 M월 d일 EEEE', { locale: ko })}
            </Typo.Body>
            <div css={Styled.categoryWrapper}>
              <div>
                <ScrollContainer css={Styled.scroller} style={{ display: 'flex' }}>
                  <RadioGroup
                    data={questionList?.types.map((question) => ({ name: question.name, identifier: question.type }))}
                    selectedId={selectedReviewCategory}
                    onClick={onClickReviewCategory}
                  />
                </ScrollContainer>
              </div>
            </div>
          </div>
          <div css={Styled.questionContainer}>
            <Typo.H2 color={FONT_COLOR.WHITE}>
              {
                questionList?.types
                  .map((question) => ({ name: question.name, identifier: question.type }))
                  .find((category) => category.identifier === selectedReviewCategory)?.name
              }
            </Typo.H2>
          </div>
          <div css={Styled.questionListContainer}>
            {selectedQuestionList?.question?.map((question, index) => {
              return (
                <div key={question.name} css={Styled.questionItemContainer}>
                  <div css={Styled.questionTitle}>
                    <Typo.Body color={FONT_COLOR.GRAY_3}>
                      Q{index + 1}. {question.name}
                    </Typo.Body>
                  </div>
                  <textarea
                    onClick={(e) => {
                      if (!isLogin) {
                        e.currentTarget.blur();
                        setIsLoginModalOpen({ isLoginModalOpen: true });
                      }
                    }}
                    value={retrospect[index]?.answer}
                    onInput={(e) => onInputRetrospect(e, question.name)}
                  ></textarea>
                </div>
              );
            })}
          </div>

          <div css={Styled.reviewButtonContainer}>
            <div>
              <Typo.Label1 color={POINT_COLOR.ERROR}>{errorText}</Typo.Label1>
            </div>
            <div css={Styled.rightButtonList}>
              <div css={Styled.checkboxContainer} onClick={handleCheckboxClick}>
                <Checkbox checked={checked} />
                <Typo.Label2 color={checked ? FONT_COLOR.GRAY_3 : FONT_COLOR.GRAY_2}>비공개</Typo.Label2>
              </div>
              <Button size='sm' onClick={onClickReview}>
                <Typo.Label1>등록</Typo.Label1>
              </Button>
            </div>
          </div>
        </section>
      )}

      <Modal closable={false} isOpen={isModalOpen} onClose={handleClickClose} isConfirm={true}>
        <div css={Styled.ConfirmModalTitle}>
          <Typo.Body color={FONT_COLOR.WHITE} style={{ fontWeight: 300 }}>
            회고를 등록시 변경이 <span style={{ fontWeight: 700 }}>불가능</span>
            합니다.
          </Typo.Body>
        </div>
        <div css={Styled.ConfrimModalButtonContainer}>
          <Button size='md' onClick={registerReview}>
            확인
          </Button>
          <Button size='md' backgroundColor={FONT_COLOR.GRAY_2} onClick={() => setIsModalOpen(false)}>
            <Typo.Label1 color={FONT_COLOR.WHITE}>취소</Typo.Label1>
          </Button>
        </div>
      </Modal>
      {isOpen && <ToastMessage isOpen={isOpen}>{text}</ToastMessage>}
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
        {selectedTab === 'REVIEW' ? <HomeReviewTextArea></HomeReviewTextArea> : <HomeMemoTextArea></HomeMemoTextArea>}
      </div>
    </div>
  );
};

export default HomeTextArea;
