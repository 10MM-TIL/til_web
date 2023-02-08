import { GrassData, GrassCellInfo } from '@/components/Grass';
import { startOfMonth, getDay, getDaysInMonth } from 'date-fns';
import { useEffect, useState, useCallback } from 'react';

const setDateArrayForGrass = (year: number, month: number, stackedDate?: Set<string> | null): GrassData => {
  const monthArray: GrassData = [];
  const DATE = new Date(year, month - 1);
  const firstDay = getDay(new Date(startOfMonth(DATE))); // 월의 시작요일 (0 = 일요일 , ... 6 = 토요일)
  const daysInMonth = getDaysInMonth(DATE); // 해당 월의 총 일수 (30, 31)

  let day = 1;
  for (let i = 0; i < 6; i++) {
    const dayArray: GrassCellInfo[] = [];
    for (let j = 0; j < 7; j++) {
      // 현재 달의 날이 끝나지 않았거나 첫쨰주의 시작 이후라면
      if ((i === 0 && j >= firstDay) || (i !== 0 && day <= daysInMonth)) {
        const curDate = new Date(year, month - 1, day);
        const dateStr = curDate.toString();
        dayArray.push({
          date: dateStr,
          status: stackedDate?.has(dateStr) ? 'stack' : 'unstack', // 보내준 배열에 날짜가 포함되어있으면 stack
        });
        day++;
      } else {
        dayArray.push({ date: '', status: 'disabled' });
      }
    }
    monthArray.push(dayArray);
  }

  return monthArray;
};

// 년도, 달, 쌓은 날짜 배열을 넘기면 달력 배열을 리턴
export const useCalendar = (year: number, month: number, stackedDate: string[]): GrassData | null => {
  const [grassData, setGrassData] = useState<GrassData | null>(null);
  const [dateSet, setDateSet] = useState<Set<string> | null>(null);

  useEffect(() => {
    setDateSet(new Set(stackedDate));
  }, [stackedDate]);

  const setGrassDataCallback = useCallback(() => {
    setGrassData(setDateArrayForGrass(year, month, dateSet));
  }, [year, month, dateSet]);

  // 달력 배열 만드는 함수
  useEffect(() => {
    setGrassDataCallback();
  }, [setGrassDataCallback]);

  return grassData;
};
