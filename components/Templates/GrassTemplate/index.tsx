import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { AuthState } from '@/stores/authStateStore';

import { GrassArea } from '@/components/Molecules/GrassArea';
import { useFetchMyGrassData } from '@/hooks/queries/timelineQuery';
import { settingGrassData } from '@/utils/timeline';

interface GrassTemplateProps {
  path: string;
  title: string;
  onClick: (value: string) => void;
}
const GrassTemplate = ({ path, title, onClick }: GrassTemplateProps) => {
  const [base, setBase] = useState(0);
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth() + base, 1); // FROM 현재 날짜 기준 1일 (5월 1일)
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 4 + base, 1); // TO 현재 날짜 기준 +4달 (10월 1일)

  const fromSeconds = Math.round(firstDay.valueOf() / 1000);
  const toSeconds = Math.round(lastDay.valueOf() / 1000);
  const firstMonth = firstDay.getMonth() + 1;
  const { isLogin } = useRecoilValue(AuthState);

  // firstDay 달을 잡고
  // meta 로 받은 데이터를 map 돌면서 Date 처리 해서 같은 달인지 체크
  // 같은 달이면 [base+1] index에 Push
  const { data: grassData, isSuccess } = useFetchMyGrassData({ path, from: fromSeconds, to: toSeconds, isLogin });

  const handleClickNext = () => {
    setBase((prev) => prev + 1);
  };
  const handleClickPrev = () => {
    setBase((prev) => prev - 1);
  };

  // useEffect(() => {
  //   refetch();
  // }, [refetch]);

  return (
    <>
      {isSuccess && (
        <GrassArea
          title={title}
          onClick={onClick}
          onClickNext={handleClickNext}
          onClickPrev={handleClickPrev}
          data={settingGrassData(grassData, firstMonth)}
        />
      )}
    </>
  );
};

export default GrassTemplate;
