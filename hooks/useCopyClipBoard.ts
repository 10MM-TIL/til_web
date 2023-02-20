import { useState } from 'react';
type onCopyFn = (text: string) => Promise<boolean>;

function useCopyClipBoard(): [boolean, onCopyFn] {
  const [isCopy, setIsCopy] = useState<boolean>(false);

  const onCopy: onCopyFn = async (text: string) => {
    // TODO TOAST 메시지로 변경
    console.log(11);

    try {
      await navigator.clipboard.writeText(text);
      setIsCopy(true);
      window.alert('복사 성공');
      return true;
    } catch (error) {
      console.error(error);
      setIsCopy(false);
      window.alert('복사 실패');
      return false;
    }
  };

  return [isCopy, onCopy];
}

export default useCopyClipBoard;
