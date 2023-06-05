import { ChangeEventHandler, useEffect, useState } from 'react';
import { useResize } from '@/hooks/useResize';

import HomeTemplates from '@/components/Templates/Home';
import { useRouter } from 'next/router';
import { useMyDraft, useMyDraftSync } from '@/hooks/queries/draftQuery';
import { usePostUploadRequest } from '@/hooks/queries/postQuery';

const HomePage = () => {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState<'MEMO' | 'REVIEW'>('MEMO'); // * MEMO & REVIEW
  const [typingState, setTypingState] = useState<'' | 'checked' | 'saving' | 'error'>('checked');

  const [memoValue, setMemoValue] = useState('');
  const [url, setUrl] = useState('');
  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDiscription] = useState('');
  const [date, setDate] = useState(new Date());

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
    uploadRequestMutate(
      { url },
      {
        onSuccess: (res) => {
          console.log(res);
          // TODO 미리보기 박스 제공 & 등록 버튼 활성화
          setIsValidUrl(true);
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
      memoValue={memoValue}
      url={url}
      isValidUrl={isValidUrl}
      onMemoChange={handleMemoChange}
      onUrlChange={handleUrlChange}
      onUrlCheck={handleUrlCheck}
      onTabChange={handleTabChange}
      onClickContent={handleClickContent}
      onClickUser={handleClickUser}
    />
  );
};

export default HomePage;
