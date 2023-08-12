import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GrassArea } from '@/components/Molecules/GrassArea';
import { GrassStackedData } from '@/components/Molecules/GrassArea/types';
import { getUserGrass } from 'apis/user';
import { useRecoilValue } from 'recoil';
import { AuthState } from '@/stores/authStateStore';

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
  const { isLogin } = useRecoilValue(AuthState);
  const firstMonth = firstDay.getMonth() + 1;
  // firstDay 달을 잡고
  // meta 로 받은 데이터를 map 돌면서 Date 처리 해서 같은 달인지 체크
  // 같은 달이면 [base+1] index에 Push
  //

  const { data: grassObject, refetch } = useQuery(
    ['timelineInfinite', 'GRASS', path, fromSeconds, toSeconds],
    () => getUserGrass(path, fromSeconds, toSeconds),
    { enabled: isLogin && path.length > 0 },
  );
  const dateList = grassObject?.metas || [];
  const stack: GrassStackedData = { '1': [], '2': [], '3': [], '4': [] };
  dateList?.forEach((item: any) => {
    const temp = new Date(item);
    temp.setHours(0, 0, 0);
    // console.log(`firstMonth :${firstMonth} // temp.getMonth :${temp.getMonth() + 1}`);
    const index = String((temp.getMonth() + 1 - firstMonth + 1 + 12) % 12) as '1' | '2' | '3' | '4';

    stack[index].push(temp.toString());
  });
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
    <GrassArea
      title={title}
      onClick={onClick}
      onClickNext={handleClickNext}
      onClickPrev={handleClickPrev}
      data={stack}
    />
  );
};

export default GrassTemplate;
