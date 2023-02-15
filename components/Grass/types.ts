import { MouseEvent } from 'react';
import { device } from '@/hooks/useResize';

export type GrassData = GrassCellInfo[][];
export type GrassStatus = 'disabled' | 'stack' | 'unstack';
// date 형태가 정해지면 수정 필요
export type GrassClickEvent = (date: string) => void;

export type GrassProps = {
  date: string;
  GrassData: GrassData | null;
  onClickCell: GrassClickEvent;
};
export type GrassCellInfo = {
  date: string;
  status: GrassStatus;
};

export type RowProps = {
  device: device;
  tanslateYPos: number;
  row: GrassCellInfo[];
  row_index: number;
  onClickCell: (date: string) => void;
  onCellMouseEnter: (
    e: MouseEvent<SVGRectElement>,
    date: string,
    x: number,
    y: number,
    cellStatus: GrassStatus,
  ) => void;
  closeHover: (e: MouseEvent<SVGRectElement>) => void;
};

export type ColProps = {
  width: number;
  height: number;
  x: number;
  y: number;
  rx: number;
  ry: number;
  date: string;
  cellDate: string;
  cellStatus: GrassStatus;
  onClickCell: (date: string) => void;
  onCellMouseEnter: (
    e: MouseEvent<SVGRectElement>,
    date: string,
    x: number,
    y: number,
    cellStatus: GrassStatus,
  ) => void;
  closeHover: (e: MouseEvent<SVGRectElement>) => void;
};

export type HoverProps = {
  device: device;
  x: number;
  y: number;
  isHover: boolean;
  dateText: string;
};
