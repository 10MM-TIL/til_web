import { GrassStackedData, GrassStackedKey } from '@/components/Molecules/GrassArea/types';

export function settingGrassData(data: { metas: string[] }, firstMonth: number) {
  const stack: GrassStackedData = {};
  if (data.metas.length === 0) return stack;
  data.metas.forEach((dataItem) => {
    const temp = new Date(dataItem);
    temp.setHours(0, 0, 0);
    const curMonth = temp.getMonth() + 1;
    const index = (((curMonth - firstMonth) % 12) + 1).toString() as GrassStackedKey;
    if (!stack[index]) stack[index] = [temp.toString()];
    else stack[index].push(temp.toString());
  });

  return stack;
}
