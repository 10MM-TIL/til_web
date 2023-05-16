import { ChangeEventHandler, useEffect, useState } from 'react';
import { useResize } from '@/hooks/useResize';

import HomeTemplates from '@/components/Templates/Home';
import { useRouter } from 'next/router';
import { useMyDraft, useMyDraftSync } from '@/hooks/queries/draftQuery';

const HomePage = () => {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState<'MEMO' | 'REVIEW'>('MEMO'); // * MEMO & REVIEW
  const [typingState, setTypingState] = useState<'' | 'checked' | 'saving' | 'error'>('checked');

  const [memoValue, setMemoValue] = useState('');
  const [reviewValue, setReviewValue] = useState('');
  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);

  const { data } = useMyDraft();
  const { mutateAsync } = useMyDraftSync();

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
      mutateAsync(
        { data: e.target.value },
        { onSuccess: () => setTypingState('checked'), onError: () => setTypingState('error') },
      );
    }, 5000);

    setTypingTimer(newTypingTimer);
  };

  const handleReviewChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setReviewValue(e.currentTarget.value);
  };

  const handleClickContent = (url: string = '') => {
    window.open(url);
  };

  const handleClickUser = (userpath: string = '') => {
    router.push(`/${userpath}`);
  };

  useEffect(() => {
    setMemoValue(data?.data?.data ?? '');
  }, [data?.data?.data]);

  return (
    <HomeTemplates
      selectedTab={selectedTab}
      typingState={typingState}
      memoValue={memoValue}
      reviewValue={reviewValue}
      onMemoChange={handleMemoChange}
      onReviewChange={handleReviewChange}
      onTabChange={handleTabChange}
      onClickContent={handleClickContent}
      onClickUser={handleClickUser}
    />
  );
};

export default HomePage;
