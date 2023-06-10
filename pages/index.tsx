import { ChangeEventHandler, SyntheticEvent, useEffect, useRef, useState } from 'react';

import HomeTemplates from '@/components/Templates/Home';
import { useRouter } from 'next/router';
import { useMyDraft, useMyDraftSync } from '@/hooks/queries/draftQuery';
import { usePostUploadRequest } from '@/hooks/queries/postQuery';
import { format } from 'date-fns';

const HomePage = () => {
  const router = useRouter();

  const titleRef = useRef<HTMLInputElement>(null);
  const [selectedTab, setSelectedTab] = useState<'MEMO' | 'REVIEW'>('MEMO'); // * MEMO & REVIEW
  const [typingState, setTypingState] = useState<'' | 'checked' | 'saving' | 'error'>('checked');

  const [isUrlLoading, setIsUrlLoading] = useState(false);
  const [memoValue, setMemoValue] = useState('');
  const [url, setUrl] = useState('');
  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [date, setDate] = useState<string>('');

  const { data } = useMyDraft();
  const { mutateAsync: memoMutate } = useMyDraftSync();
  const { mutateAsync: uploadRequestMutate } = usePostUploadRequest();

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
    setIsValidUrl(false);
  };

  const handleUrlCheck = () => {
    setIsUrlLoading(true);
    uploadRequestMutate(
      { url },
      {
        onSettled: () => {
          setIsUrlLoading(false);
        },
        onSuccess: (res) => {
          console.log(res);
          // TODO 미리보기 박스 제공 & 등록 버튼 활성화
          setIsValidUrl(true);
          setTitle(res?.data?.title?.substring(0, 30));
          setSummary(res?.data?.summary?.substring(0, 100));
          setTimeout(() => {
            titleRef?.current?.focus();
          }, 200);
        },
        onError: (err) => {
          console.log(err);
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
      isValidUrl={isValidUrl}
      date={date}
      title={title}
      summary={summary}
      titleRef={titleRef}
      onMemoChange={handleMemoChange}
      onUrlChange={handleUrlChange}
      onUrlCheck={handleUrlCheck}
      onDateChange={handleDateChange}
      onTitleChange={handleTitleChange}
      onSummaryChange={handleSummaryChange}
      onTabChange={handleTabChange}
      onClickContent={handleClickContent}
      onClickUser={handleClickUser}
    />
  );
};

export default HomePage;
