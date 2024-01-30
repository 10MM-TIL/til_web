import { useState, ChangeEventHandler, useRef, useEffect, SyntheticEvent, ReactNode, FormEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

import { LoginModalState } from '@/stores/modalStateStore';
import { AuthState } from '@/stores/authStateStore';

import { useMyDraft, useMyDraftSync } from '@/hooks/queries/draftQuery';
import { usePostUploadConfirm, usePostUploadRequest } from '@/hooks/queries/postQuery';
import { useMyQuestion, useQuestionType, useRandomQuestion } from '@/hooks/queries/questionQuery';
import useToast from '@/hooks/useToast';

import { FONT_COLOR, POINT_COLOR } from '@/constants/color';

import * as Typo from '@/components/Atom/Typography';
import { H1 } from '@/components/Atom/Typography';
import { Button } from '@/components/Atom/Button';
import State from '@/components/Atom/State';

import * as Styled from './styles';
import RadioGroup from '@/components/Molecules/RadioGroup';
import Checkbox from '@/components/Atom/Checkbox';
import { usePostMyRetrospect } from '@/hooks/queries/retrospectQuery';
import { Retrospect } from '@/apis/retrospect';
import ScrollContainer from 'react-indiana-drag-scroll';
import ToastMessage from '@/components/ToastMessage';

type HomeTextAreaProps = {
  showToast: (text: ReactNode, warning: boolean) => void;
  userInfo: any;
};

const HomeReviewTextArea = () => {
  const queryClient = useQueryClient();
  const { isOpen, showToast, text } = useToast();
  const [errorText, setErrorText] = useState('');
  const [selectedReviewCategory, setSelectedReviewCategory] = useState('');
  const { mutateAsync: postMyRetrospect } = usePostMyRetrospect();
  // const { data: myRetrospect, isSuccess: isMyRetrospectFetchSuccess } = useMyRetrospect();
  const { data: questionList, isSuccess: isMyQuestionFetchSuccess } = useRandomQuestion();
  const { data: selectedQuestionList, isSuccess: isQuestionTypeFetchSuccess } = useQuestionType({
    questionType: selectedReviewCategory,
  });
  const { isLogin } = useRecoilValue(AuthState);
  const setIsLoginModalOpen = useSetRecoilState(LoginModalState);
  const [checked, setChecked] = useState(false);
  const [retrospect, setRetrospect] = useState<Retrospect>([]);

  useEffect(() => {
    if (isQuestionTypeFetchSuccess) {
      setRetrospect(
        selectedQuestionList.question.map((questionItem) => ({ questionName: questionItem.questionName, answer: '' })),
      );
    }
  }, [isQuestionTypeFetchSuccess, selectedQuestionList?.question]);

  // 질문 리스트 클릭
  const onClickReviewCategory = (identifier: string) => {
    setSelectedReviewCategory(identifier);
  };

  const checkReviewisSelected = () => {
    if (retrospect.filter((restrospectItem) => restrospectItem.answer.trim().length > 0).length <= 0) {
      setErrorText('최소 1개의 질문에 답해주세요.');
      return true;
    }
  };

  const registerReview = async () => {
    if (checkReviewisSelected()) return;
    await postMyRetrospect(
      { isSecret: checked, questionType: selectedReviewCategory, retrospect: retrospect },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['RETROSPECT_BY_PATH']);
          showToast(<Typo.H1 color={FONT_COLOR.WHITE}>회고 등록이 완료되었습니다.</Typo.H1>, false);
        },
        onError: (e) => {
          const Error = e as { errorCode: string; description: string };
          setErrorText(Error.description);
        },
        onSettled: () => {
          queryClient.invalidateQueries(['RETROSPECT_GRASS_DATA']);
        },
      },
    );
    setRetrospect((prevRetrospect) => {
      return prevRetrospect.map((prev) => ({ questionName: prev.questionName, answer: '' }));
    });
  };

  const handleCheckboxClick = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (isMyQuestionFetchSuccess) setSelectedReviewCategory(questionList?.types[0].questionType);
  }, [isMyQuestionFetchSuccess, questionList?.types]);

  const onInputRetrospect = (event: FormEvent<HTMLTextAreaElement>, question: string) => {
    setErrorText('');
    const value = event.currentTarget.value;

    setRetrospect((prevRetrospect) => {
      // 이전 상태를 기반으로 새로운 배열을 생성
      return prevRetrospect.map((item) => {
        // 질문이 일치하면 해당 아이템을 업데이트
        if (item.questionName === question) {
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
                    data={questionList?.types.map((question) => {
                      const { questionTypeName, questionType, isRandom } = question;
                      return {
                        name: isRandom ? '랜덤 질문' : questionTypeName,
                        identifier: questionType,
                      };
                    })}
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
                  .map((question) => ({ name: question.questionTypeName, identifier: question.questionType }))
                  .find((category) => category.identifier === selectedReviewCategory)?.name
              }
            </Typo.H2>
          </div>
          <div css={Styled.questionListContainer}>
            {selectedQuestionList?.question?.map((question, index) => {
              return (
                <div key={question.questionName} css={Styled.questionItemContainer}>
                  <div css={Styled.questionTitle}>
                    <Typo.Body color={FONT_COLOR.GRAY_3}>
                      Q{index + 1}. {question.questionName}
                    </Typo.Body>
                  </div>
                  <textarea
                    maxLength={300}
                    onClick={(e) => {
                      if (!isLogin) {
                        e.currentTarget.blur();
                        setIsLoginModalOpen({ isLoginModalOpen: true });
                      }
                    }}
                    value={retrospect[index]?.answer}
                    onInput={(e) => onInputRetrospect(e, question.questionName)}
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
              <Button
                size='sm'
                onClick={(e) => {
                  if (!isLogin) {
                    e.currentTarget.blur();
                    setIsLoginModalOpen({ isLoginModalOpen: true });
                    return;
                  }
                  registerReview();
                }}
              >
                <Typo.Label1>등록</Typo.Label1>
              </Button>
            </div>
          </div>
        </section>
      )}
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
        {selectedTab === 'REVIEW' ? <HomeReviewTextArea /> : <HomeMemoTextArea />}
      </div>
    </div>
  );
};

export default HomeTextArea;
