import { GrassContainer, GrassDate, GrassRowG, GrassCell } from './styles';
import * as Typo from '@/components/Typography';
import { GrassProps, RowProps, ColProps } from './types';
import { useCallback, memo } from 'react';
import { FONT_COLOR } from '@/constants/color';

const RADIUS_X = 1;
const RADIUS_Y = 1;
const TABLE_WIDTH = 153;
const TABLE_HEIGHT = 130;
const TABLE_TOTAL = 23;
const TABLE_GAP = 8;
const CELL_WIDTH = 15;
const CELL_HEIGHT = 15;

const Grass = ({ date, GrassData, onClickCell }: GrassProps) => {
  // GrassRow
  const GrassRow = ({ row_index, children }: RowProps) => {
    return (
      <GrassRowG key={`row-${row_index}`} transform={`translate(0, ${0 + row_index * TABLE_GAP})`}>
        {children}
      </GrassRowG>
    );
  };

  // GrassCol
  const GrassCol = ({
    width,
    height,
    x,
    y,
    rx,
    ry,
    text,
    cellStatus,
    onClickCell,
  }: Omit<ColProps, 'onCLickCell' | 'cellDate'> & { onClickCell: () => void }) => {
    return (
      <GrassCell
        width={width}
        height={height}
        x={x}
        y={y}
        rx={rx}
        ry={ry}
        cellStatus={cellStatus}
        onClick={onClickCell}
      >
        {text}
      </GrassCell>
    );
  };

  return (
    <GrassContainer>
      <div>
        <GrassDate>
          <Typo.Label2 color={FONT_COLOR.GRAY_3}>{date}</Typo.Label2>
        </GrassDate>
        <svg width={TABLE_WIDTH} height={TABLE_HEIGHT}>
          {GrassData &&
            GrassData.map((row, row_index) => {
              return (
                <GrassRow key={`row-${row_index}`} row_index={row_index}>
                  {row.map((column, col_index) => {
                    const clickCellDate = () => onClickCell(column.date);
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
                        onClickCell={clickCellDate}
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

export default memo(Grass);
