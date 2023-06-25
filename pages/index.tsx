import { ChangeEventHandler, SyntheticEvent, useEffect, useRef, useState } from 'react';

import HomeTemplates from '@/components/Templates/Home';
import { useRouter } from 'next/router';
import { useMyDraft, useMyDraftSync } from '@/hooks/queries/draftQuery';
import { usePostUploadConfirm, usePostUploadRequest } from '@/hooks/queries/postQuery';
import { format } from 'date-fns';
import useToast from '@/hooks/useToast';
import IconCheckBig from '@/assets/svgs/IconCheckBig';
import { FONT_COLOR } from '@/constants/color';
import { H1 } from '@/components/Atom/Typography';

const HomePage = () => {
  const router = useRouter();
  const { isOpen, text, showToast } = useToast();

  const titleRef = useRef<HTMLInputElement>(null);
  const [selectedTab, setSelectedTab] = useState<'MEMO' | 'REVIEW'>('REVIEW'); // * MEMO & REVIEW
  const [typingState, setTypingState] = useState<'' | 'checked' | 'saving' | 'error'>('checked');

  const [isUrlLoading, setIsUrlLoading] = useState(false);
  const [memoValue, setMemoValue] = useState('');
  const [url, setUrl] = useState('');
  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);
  const [validUrlStatus, setValidUrlStatus] = useState<'BEFORE' | 'INVALID' | 'VALID'>('BEFORE');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [date, setDate] = useState<string>('');

  const { data } = useMyDraft();
  const { mutateAsync: memoMutate } = useMyDraftSync();
  const { mutateAsync: uploadRequestMutate } = usePostUploadRequest();
  const { mutateAsync: uploadConfirmMutate } = usePostUploadConfirm();

  const handleTabChange = (type: 'MEMO' | 'REVIEW') => {
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
        { onSuccess: () => setTypingState('checked'), onError: () => setTypingState('error') },
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

  const handleUrlConfirm = async () => {
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
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1;
          showToast(
            <>
              <IconCheckBig />
              <H1 color={FONT_COLOR.WHITE}>
                {currentMonth}월 {res?.data?.monthlyPublishCount + 1}번째 브릭을 쌓았어요!
              </H1>
            </>,
          );
          setUrl('');
        },
        onError: () => {
          // TODO ALERT
          alert('등록에 실패했습니다. 새로고침 후 다시 시도해주세요');
        },
      },
    );
  };

  const handleClickContent = (url: string = '') => {
    window.open(url);
  };

  const handleClickUser = (userpath: string = '') => {
    router.push(`/@${userpath}`);
  };

  useEffect(() => {
    setMemoValue(data?.data?.data ?? '');
  }, [data?.data?.data]);

  return (
    <HomeTemplates
      selectedTab={selectedTab}
      typingState={typingState}
      isUrlLoading={isUrlLoading}
      memoValue={memoValue}
      url={url}
      validUrlStatus={validUrlStatus}
      date={date}
      title={title}
      summary={summary}
      titleRef={titleRef}
      isToastOpen={isOpen}
      toastText={text}
      onMemoChange={handleMemoChange}
      onUrlChange={handleUrlChange}
      onUrlCheck={handleUrlCheck}
      onDateChange={handleDateChange}
      onTitleChange={handleTitleChange}
      onSummaryChange={handleSummaryChange}
      onUrlConfirm={handleUrlConfirm}
      onTabChange={handleTabChange}
      onClickContent={handleClickContent}
      onClickUser={handleClickUser}
    />
  );
};

export default HomePage;
