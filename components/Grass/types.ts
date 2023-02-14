import { ReactNode } from 'react';
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
  tanslateYPos: number;
  children: ReactNode;
};
export type ColProps = {
  width: number;
  height: number;
  x: number;
  y: number;
  rx: number;
  ry: number;
  text: string;
  cellDate: string;
  cellStatus: GrassStatus;
  onClickCell: GrassClickEvent;
};
