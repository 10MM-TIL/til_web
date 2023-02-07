import { GrassContainer, GrassDate, GrassRowG, GrassCell } from './styles';
import * as Typo from '@/components/Typography';
import { GrassProps, RowProps, ColProps } from './types';
import { useCallback } from 'react';
import { FONT_COLOR } from '@/constants/color';

const RADIUS_X = 1;
const RADIUS_Y = 1;
const TABLE_WIDTH = 153;
const TABLE_HEIGHT = 107;
const TABLE_TOTAL = 23;
const TABLE_GAP = 8;
const CELL_WIDTH = 15;
const CELL_HEIGHT = 15;

const GrassRow = ({ row_index, children }: RowProps) => {
  return (
    <GrassRowG key={`row-${row_index}`} transform={`translate(0, ${0 + row_index * TABLE_GAP})`}>
      {children}
    </GrassRowG>
  );
};

const GrassCol = ({ width, height, x, y, rx, ry, text, cellStatus, cellDate, onClickCell }: ColProps) => {
  const cellClickHandler = useCallback(() => {
    onClickCell(cellDate);
  }, [cellDate, onClickCell]);

  return (
    <GrassCell
      width={width}
      height={height}
      x={x}
      y={y}
      rx={rx}
      ry={ry}
      cellStatus={cellStatus}
      onClick={cellClickHandler}
    >
      {text}
    </GrassCell>
  );
};

export const Grass = ({ date, GrassData, onClickCell }: GrassProps) => {
  return (
    <GrassContainer>
      <div>
        <GrassDate>
          <Typo.Label2 color={FONT_COLOR.GRAY_3}>{date}</Typo.Label2>
        </GrassDate>
        <svg width={TABLE_WIDTH} height={TABLE_HEIGHT}>
          {GrassData.map((row, row_index) => {
            return (
              <GrassRow key={`row-${row_index}`} row_index={row_index}>
                {row.map((column, col_index) => {
                  return (
                    <GrassCol
                      key={`column-${col_index}`}
                      width={CELL_WIDTH}
                      height={CELL_HEIGHT}
                      x={`${0 + col_index * TABLE_TOTAL}`}
                      y={`${0 + row_index * (TABLE_TOTAL - TABLE_GAP)}`}
                      rx={RADIUS_X}
                      ry={RADIUS_Y}
                      text={column.date}
                      cellStatus={column.status}
                      cellDate={column.date}
                      onClickCell={() => onClickCell(column.date)}
                    ></GrassCol>
                  );
                })}
              </GrassRow>
            );
          })}
        </svg>
      </div>
    </GrassContainer>
  );
};
