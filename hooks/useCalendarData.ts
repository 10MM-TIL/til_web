import { GrassData, GrassCellInfo, GrassCalendarArray } from '@/components/Atom/Grass';
import { startOfMonth, getDay, getDaysInMonth, format } from 'date-fns';
import { useEffect, useState, Dispatch, SetStateAction, useCallback } from 'react';
export type monthYearData = {
  year: number;
  month: number;
  monthEng: 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';
};

type CalendarDataProps = [
  GrassCalendarArray,
  Dispatch<SetStateAction<GrassCalendarArray>>,
  monthYearData[],
  Dispatch<SetStateAction<monthYearData[]>>,
  (year: number, month: number, stackedDate?: string[] | null) => GrassData,
];
type stackedData = {
  [key: number]: string[];
};

const setDateArrayForGrass = (year: number, month: number, stackedDate?: string[] | null): GrassData => {
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
          status: stackedDate?.includes(dateStr) ? 'stack' : 'unstack', // 보내준 배열에 날짜가 포함되어있으면 stack
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

// [
//   { year: 2023, month: 1, monthEng: 'Jan' },
//   { year: 2023, month: 2, monthEng: 'Feb' },
//   { year: 2023, month: 3, monthEng: 'Mar' },
//   { year: 2023, month: 4, monthEng: 'Apr' },
//   { year: 2023, month: 5, monthEng: 'May' },
// ];

const setCurrentFourthDate = (year: number, month: number): monthYearData[] => {
  const currentFourthArray = Array.from({ length: 5 }, (_, i) => {
    if (month + i <= 12) {
      return {
        year,
        month: i + month,
        monthEng: format(new Date(year, month + i - 1), 'MMM') as monthYearData['monthEng'],
      };
    } else {
      return {
        year: year + 1,
        month: (month + i) % 12,
        monthEng: format(new Date(year + 1, ((month + i) % 12) - 1), 'MMM') as monthYearData['monthEng'],
      };
    }
  });

  return currentFourthArray;
};

// 년도, 달, 쌓은 날짜 배열을 넘기면 달력 배열을 리턴
export const useCalendarData = (year: number, month: number, stackedDate: stackedData): CalendarDataProps => {
  const [grassData, setGrassData] = useState<GrassCalendarArray>([]);
  const [yearMonthArr, setYearMonthArr] = useState<monthYearData[]>([]);

  useEffect(() => {
    // 시작의 날짜 + 뒤의 5개월 날짜 세팅
    setYearMonthArr(setCurrentFourthDate(year, month));
  }, [year, month]);

  const setGrassArray = useCallback(() => {
    setGrassData([]);
    yearMonthArr?.forEach((i, index) => {
      setGrassData((prev) => [...prev, { data: setDateArrayForGrass(i.year, i.month, stackedDate[index + 1]) }]);
    });
  }, [stackedDate, yearMonthArr]);

  useEffect(() => {
    setGrassArray();
  }, [setGrassArray]);

  return [grassData, setGrassData, yearMonthArr, setYearMonthArr, setDateArrayForGrass];
};
