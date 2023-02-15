import * as Styled from './styles';
import * as Typo from '@/components/Typography';
import { GrassProps, RowProps, ColProps, GrassStatus } from './types';
import { useCallback, memo, useState, useMemo, useRef, RefObject, MouseEvent, useEffect } from 'react';
import { FONT_COLOR } from '@/constants/color';
import { IconArrow } from '@/assets/svgs/IconArrow';
import { css } from '@emotion/react';
import { format } from 'date-fns';

const RADIUS_X = 1;
const RADIUS_Y = 1;
const TABLE_WIDTH = 155;
const TABLE_HEIGHT = 132;

const TABLE_GAP = 6;
const CELL_WIDTH = 17;
const CELL_HEIGHT = 17;

const TABLE_TOTAL = 23; // (17 + 6)

// 미리 x, y의 포지션을 정함
// const setGrassPosArr = (xRatio: number, yRatio: number) => {
//   const grassPosArray: GrassPos[][] = [];
//   for (let i = 0; i < 6; i++) {
//     const xyPosArray: GrassPos[] = [];
//     for (let j = 0; j < 7; j++) {
//       xyPosArray.push({ x: j * 23, y: i * 17 });
//     }
//     grassPosArray.push(xyPosArray);
//   }
//   return grassPosArray;
// };

const HoverContent = ({
  hoverRef,
  x,
  y,
  isHover,
  dateText,
}: {
  hoverRef: RefObject<HTMLDivElement>;
  x: number;
  y: number;
  isHover: boolean;
  dateText: string;
}) => {
  // TODO x축 변경 필요
  // const Xpos = useMemo(() => {
  //   // x의 시작 지점
  //   // 0, 23, 46
  //   return -10;
  // }, []);

  const Ypos = useMemo(() => {
    // Y의 시작 지점
    // 0, 15, 30 ....
    // Y 포지션 + (row * GAP의 간격)
    const colIndex = y / CELL_HEIGHT;
    const firstYPos = y + TABLE_GAP * (colIndex - 1);
    // Y의 시작 지점 - 툴팁 높이(50px)
    return firstYPos - 50;
  }, [y]);

  const Arrow = () => {
    return (
      <button>
        <IconArrow></IconArrow>
      </button>
    );
  };
  return (
    <Styled.GrassHoverContainer
      isHover={isHover}
      css={css`
        transform: ${`translate3d(${-10}px, ${Ypos}px, 0px)`};
      `}
      ref={hoverRef}
    >
      <div>
        <Typo.Label1 color={FONT_COLOR.GRAY_3}>{dateText}</Typo.Label1>
        <Arrow></Arrow>
      </div>
    </Styled.GrassHoverContainer>
  );
};

// GrassRow
const GrassRow = memo(function GrassRow({ tanslateYPos, children }: RowProps) {
  return <Styled.GrassRowG transform={`translate(0, ${tanslateYPos})`}>{children}</Styled.GrassRowG>;
});
// GrassCol
const GrassCol = memo(function GrassCol({
  width,
  height,
  x,
  y,
  rx,
  ry,
  date,
  cellStatus,
  closeHover,
  onClickCell,
  onCellMouseEnter,
}: Omit<ColProps, 'onCLickCell' | 'cellDate'> & {
  onClickCell: (date: string) => void;
  onCellMouseEnter: (
    e: MouseEvent<SVGRectElement>,
    date: string,
    x: number,
    y: number,
    cellStatus: GrassStatus,
  ) => void;
  closeHover: (e: MouseEvent<SVGRectElement>) => void;
}) {
  return (
    <>
      <Styled.GrassCell
        width={width}
        height={height}
        x={x}
        y={y}
        rx={rx}
        ry={ry}
        cellStatus={cellStatus}
        onClick={() => onClickCell(date)}
        onMouseEnter={(e) => {
          onCellMouseEnter(e, date, x, y, cellStatus);
        }}
        onMouseOut={(e) => closeHover(e)}
      ></Styled.GrassCell>
    </>
  );
});

const Grass = ({ date, GrassData, onClickCell }: GrassProps) => {
  const [isHover, setIsHover] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const hoverRef = useRef<HTMLDivElement>(null);

  const closeHover = useCallback((e: MouseEvent<SVGRectElement>) => {
    e.stopPropagation();
    setIsHover(false);
  }, []);

  const GrassDate = () => {
    return (
      <Styled.GrassDate>
        <Typo.Label2 color={FONT_COLOR.GRAY_3}>{date}</Typo.Label2>
      </Styled.GrassDate>
    );
  };

  const onCellMouseEnter = useCallback(
    (e: MouseEvent<SVGRectElement>, date: string, x: number, y: number, cellStatus: GrassStatus) => {
      e.stopPropagation();
      if (cellStatus === 'disabled') return;
      // setIsHover(true);
      setHoverText(format(new Date(date), 'yyyy.MM.dd'));
      setHoverPosition({ x, y });
    },
    [],
  );

  useEffect(() => {
    console.log(11);
  }, [isHover]);

  return (
    <Styled.GrassContainer>
      <div>
        <GrassDate></GrassDate>
        <Styled.GrassSVGWrapper>
          <svg width={TABLE_WIDTH} height={TABLE_HEIGHT}>
            {GrassData?.map((row, row_index) => {
              return (
                <GrassRow key={`row-${row_index}`} tanslateYPos={row_index * TABLE_GAP}>
                  {row.map((column, col_index) => {
                    return (
                      <GrassCol
                        key={`column-${col_index}`}
                        width={CELL_WIDTH}
                        height={CELL_HEIGHT}
                        x={col_index * TABLE_TOTAL}
                        y={row_index * (TABLE_TOTAL - TABLE_GAP)}
                        rx={RADIUS_X}
                        ry={RADIUS_Y}
                        date={column.date}
                        cellStatus={column.status}
                        onClickCell={onClickCell}
                        closeHover={closeHover}
                        onCellMouseEnter={onCellMouseEnter}
                      ></GrassCol>
                    );
                  })}
                </GrassRow>
              );
            })}
          </svg>

          <HoverContent
            isHover={isHover}
            hoverRef={hoverRef}
            x={hoverPosition.x}
            y={hoverPosition.y}
            dateText={hoverText}
          ></HoverContent>
        </Styled.GrassSVGWrapper>
      </div>
    </Styled.GrassContainer>
  );
};

export default memo(Grass);
