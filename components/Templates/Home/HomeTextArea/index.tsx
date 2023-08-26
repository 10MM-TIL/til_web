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

type HomeTextAreaProps = {
  showToast: (text: ReactNode) => void;
  userInfo: any;
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

  const { data } = useMyDraft();
  const { mutateAsync: uploadRequestMutate } = usePostUploadRequest();
  const { mutateAsync: uploadConfirmMutate } = usePostUploadConfirm();

  const [selectedTab, setSelectedTab] = useState<'MEMO' | 'REVIEW'>('REVIEW'); // * MEMO & REVIEW
  const [memoValue, setMemoValue] = useState('');
  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);
  const [typingState, setTypingState] = useState<'' | 'checked' | 'saving' | 'error'>('checked');

  const [url, setUrl] = useState('');
  const { mutateAsync: memoMutate } = useMyDraftSync();

  const onTabChange = (type: 'MEMO' | 'REVIEW') => {
    setSelectedTab(type);
  };

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

  const handleUrlChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUrl(e.currentTarget.value);
    setValidUrlStatus('BEFORE');
  };

  const handleUrlCheck = () => {
    if (!url.includes('https://') && !url.includes('http://')) {
      alert('https://bricklog.io/your-post 형식으로 입력해주세요.');
      return;
    }
    setIsUrlLoading(true);
    setTitle('');
    setDate('');
    setSummary('');
    uploadRequestMutate(
      { url },
      {
        onSettled: () => {
          setIsUrlLoading(false);
        },
        onSuccess: (res) => {
          // TODO 미리보기 박스 제공 & 등록 버튼 활성화
          if (res?.data.createdAt) {
            setDate(format(new Date(res.data.createdAt), 'yyyy.MM.dd'));
          }
          setValidUrlStatus('VALID');
          setTitle(res?.data?.title?.substring(0, 30));
          setSummary(res?.data?.summary?.substring(0, 100));
          setTimeout(() => {
            titleRef?.current?.focus();
          }, 200);
        },
        onError: (err) => {
          console.error(err);
          setValidUrlStatus('INVALID');
        },
      },
    );
  };
  const handleUrlConfirm = () => {
    onUrlConfirm();
    window.dataLayer.push({
      event: 'post',
      category: userInfo?.categoryName,
      post_url: url,
      post_date: date,
    });
  };

  const onUrlConfirm = async () => {
    // TODO 입력 필드 검증
    if (validUrlStatus !== 'VALID' || url === '') {
      alert('유효한 url을 입력해주세요.');
      return;
    }

    if (title === '' || title.replace(/\s/, '').length === 0) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (summary === '' || summary.replace(/\s/, '').length === 0) {
      alert('요약을 입력해주세요.');
      return;
    }

    if (date === '') {
      alert('회고 날짜를 입력해주세요.');
      return;
    }

    if (new Date(date).getTime() > new Date().getTime()) {
      alert('미래 날짜는 입력이 불가능합니다.');
      return;
    }

    if (new Date(date).getTime() < new Date('2000-01-01').getTime()) {
      alert('2000년 1월 1일 이전에 작성된 포스트는 등록할 수 없습니다.');
      return;
    }

    await uploadConfirmMutate(
      { url, title, summary, createdAt: date.replace(/\./gi, '-') },
      {
        onSuccess: (res) => {
          const currentMonth = date.substring(5, 7);

          showToast(
            <>
              <IconCheckBig />
              <H1 color={FONT_COLOR.WHITE}>
                {Number(currentMonth) < 10 ? currentMonth[1] : currentMonth}월 {res?.data?.monthlyPublishCount}번째
                브릭을 쌓았어요!
              </H1>
            </>,
          );
          setTitle('');
          setSummary('');
          setDate('');
          setUrl('');
          setValidUrlStatus('BEFORE');
          queryClient.resetQueries();
        },
        onError: () => {
          // TODO ALERT
          alert('등록에 실패했습니다. 새로고침 후 다시 시도해주세요');
        },
      },
    );
  };
  const handleDateChange = (calendarDate: Date | null, event: SyntheticEvent<any, Event> | undefined) => {
    if (!calendarDate) return;
    setDate(format(calendarDate, 'yyyy.MM.dd'));
  };

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.currentTarget.value);
  };

  const handleSummaryChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSummary(e.currentTarget.value);
  };

  useEffect(() => {
    setMemoValue(data?.data?.data ?? '');
  }, [data?.data?.data]);
  return (
    <div>
      <div css={Styled.textareaContainer}>
        <div css={Styled.reviewTab({ selectedTab })} onClick={() => onTabChange('REVIEW')}>
          <Typo.H1 color={selectedTab === 'MEMO' ? '#636C78' : FONT_COLOR.WHITE}>회고</Typo.H1>
        </div>
        <div css={Styled.memoTab({ selectedTab })} onClick={() => onTabChange('MEMO')}>
          <Typo.H1 color={selectedTab === 'MEMO' ? FONT_COLOR.WHITE : '#636C78'}>메모</Typo.H1>
        </div>
        {selectedTab === 'REVIEW' && (
          <Link
            href='https://10miri.notion.site/a96b7e92cdee4bc2836a0012b8b610b7'
            target='_blank'
            css={Styled.reviewGuide}
          >
            <Typo.Label2 color={FONT_COLOR.GRAY_2}>본인의 콘텐츠만 등록해 주세요.</Typo.Label2>
          </Link>
        )}
        {selectedTab === 'MEMO' ? (
          <textarea
            placeholder={'잊지 말아야 할 것들을 메모해보세요.'}
            value={memoValue}
            css={Styled.textarea}
            onChange={handleMemoChange}
            onClick={(e) => {
              if (!isLogin) {
                e.currentTarget.blur();
                setIsLoginModalOpen({ isLoginModalOpen: true });
              }
            }}
          />
        ) : (
          <div css={Styled.reviewContainer}>
            <div css={Styled.reviewInputContainer}>
              <input
                type='text'
                value={url}
                onChange={handleUrlChange}
                css={Styled.reviewInput}
                onClick={(e) => {
                  if (!isLogin) {
                    e.currentTarget.blur();
                    setIsLoginModalOpen({ isLoginModalOpen: true });
                  }
                }}
                placeholder='https://bricklog.io/your-post'
              />
              <button
                type='button'
                css={Styled.reviewLoadBtn({
                  isEnable: url.length > 0 && validUrlStatus === 'BEFORE' && !isUrlLoading,
                })}
                onClick={handleUrlCheck}
                disabled={isUrlLoading}
              >
                {isUrlLoading ? <Spinner size='16px' /> : '불러오기'}
              </button>
            </div>
            {validUrlStatus === 'INVALID' && (
              <div css={Styled.invalidContainer}>
                <IconError />
                <Typo.Body color={POINT_COLOR.ERROR}>유효하지 않은 URL입니다.</Typo.Body>
              </div>
            )}
            {validUrlStatus === 'VALID' && (
              <div css={Styled.timelineContainer}>
                <div css={Styled.timeline}>
                  {/* 타임라인 */}
                  <div css={Styled.timelineLeftArea}>
                    {/* LEFT (INPUT AREA) */}

                    <DatePicker
                      locale={ko}
                      showPopperArrow={false}
                      dateFormat={'yyyy.MM.dd'}
                      selected={date === '' ? null : new Date(date.replace(/\./gi, '-'))}
                      onChange={handleDateChange}
                      customInput={
                        <div css={Styled.timelineCalendar}>
                          <Typo.Label1 color={FONT_COLOR.GRAY_3}>
                            {date === '' ? '날짜를 입력해주세요' : date}
                          </Typo.Label1>
                          <IconCalendar />
                        </div>
                      }
                    />

                    <div css={Styled.timelineInputContainer}>
                      <input
                        ref={titleRef}
                        placeholder='불러온 글의 제목을 작성해주세요.'
                        maxLength={30}
                        value={title}
                        css={Styled.timelineTitleInput}
                        onChange={handleTitleChange}
                      />
                      <input
                        placeholder='불러온 글을 설명해주세요.'
                        maxLength={100}
                        value={summary}
                        css={Styled.timelineSummaryInput}
                        onChange={handleSummaryChange}
                      />
                    </div>
                  </div>
                  <div>
                    {/* RIGHT (ICON AREA) */}
                    <BlogIcon url={url} />
                  </div>
                </div>
                <div css={Styled.timelineSubmitBtnContainer}>
                  <Button size='sm' onClick={handleUrlConfirm}>
                    등록
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
        {selectedTab === 'MEMO' && memoValue.length > 0 && (
          <div css={Styled.textareaBottomContainer({ selectedTab })}>
            {typingState !== '' && <State state={typingState} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeTextArea;
