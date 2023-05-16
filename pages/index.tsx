import { ChangeEventHandler, useState } from 'react';
import { useResize } from '@/hooks/useResize';

import HomeTemplates from '@/components/Templates/Home';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState<'MEMO' | 'REVIEW'>('MEMO'); // * MEMO & REVIEW
  const [typingState, setTypingState] = useState<'' | 'checked' | 'saving' | 'error'>('checked');

  const [memoValue, setMemoValue] = useState('');
  const [reviewValue, setReviewValue] = useState('');

  const handleTabChange = (type: 'MEMO' | 'REVIEW') => {
    setSelectedTab(type);
  };

  const handleMemoChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setTypingState('saving');

    // TODO 쓰로틀링 & 서버 API
    setMemoValue(e.currentTarget.value);

    setTimeout(() => {
      setTypingState('checked');
    }, 2000);
  };

  const handleReviewChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setReviewValue(e.currentTarget.value);
  };

  const handleClickContent = (url: string = '') => {
    window.open(url);
  };

  const handleClickUser = (userpath: string = '') => {
    router.push(`/${userpath}`);
  };

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
