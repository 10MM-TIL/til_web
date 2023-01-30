import { ReactElement } from 'react';
import { GrassContainer, GrassDate, GrassRow, GrassCell } from './styles';
import * as Typo from '@/components/Typography';
const test = [
  [null, null, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, null, null, null, null],
];

const RADIUS_X = 1;
const RADIUS_Y = 1;
const TABLE_WIDTH = 153;
const TABLE_HEIGHT = 107;
const TABLE_TOTAL = 23;
const TABLE_GAP = 8;
const CELL_WIDTH = 15;
const CELL_HEIGHT = 15;
// 0,0 (0,23), (0,46) (0, 69)
// (23, )

export const Grass = ({}: any): ReactElement => {
  return (
    <GrassContainer>
      <div>
        <GrassDate>
          <Typo.Label2 color='#C5CAD0'>2023 Jan</Typo.Label2>
        </GrassDate>
        <svg width={TABLE_WIDTH} height={TABLE_HEIGHT}>
          {test.map((row, row_index) => {
            return (
              <GrassRow transform={`translate(0, ${0 + row_index * TABLE_GAP})`} key={`row-${row_index}`}>
                {row.map((column, col_index) => {
                  // y 고정
                  return (
                    <GrassCell
                      key={`column-${col_index}`}
                      width={CELL_WIDTH}
                      height={CELL_HEIGHT}
                      x={`${0 + col_index * TABLE_TOTAL}`}
                      y={`${0 + row_index * (TABLE_TOTAL - TABLE_GAP)}`}
                      rx={RADIUS_X}
                      ry={RADIUS_Y}
                      cellStatus={column}
                    ></GrassCell>
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

// const GrassRow = (
//   width: string,
//   height: string,
//   x: string,
//   y: string,
//   rx: string,
//   ry: string,
//   text: string,
// ): ReactElement => {
//   return (
//     <rect width={width} height={height} x={x} y={y} rx={rx} ry={ry}>
//       {text}
//     </rect>
//   );
// };
