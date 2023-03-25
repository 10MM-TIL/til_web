import * as Styled from './styles';
import * as Typo from '@/components/Atom/Typography';
import { GrassProps, RowProps, ColProps, GrassStatus, HoverProps } from './types';
import { useCallback, memo, useState, useMemo, MouseEvent, useEffect } from 'react';
import { FONT_COLOR } from '@/constants/color';
import { css } from '@emotion/react';
import { format } from 'date-fns';
import { useResize } from '@/hooks/useResize';
import { IconGrassHoverArrow } from '@/assets/svgs/IconGrassHoverArrow';

const RADIUS_X = 1;
const RADIUS_Y = 1;
const TABLE_WIDTH = 155;
const TABLE_WIDTH_M = 263;
const TABLE_HEIGHT = 132;
const TABLE_HEIGHT_M = 230;

const TABLE_GAP = 6;
const TABLE_GAP_M = 10;

const CELL_WIDTH = 17;
const CELL_WIDTH_M = 29;

const CELL_HEIGHT = 17;
const CELL_HEIGHT_M = 29;

const TABLE_TOTAL = CELL_WIDTH + TABLE_GAP; // (17 + 6)
const TABLE_TOTAL_M = CELL_WIDTH_M + TABLE_GAP_M; // (29 + 10)

// 호버 컨텐츠 총 width
const HOVER_WRAPPER_WIDTH = 101;
const HOVER_WRAPPER_PADDING_RIGHT = 18.5;

const HOVER_WRAPPER_HEIGHT = 48;
// 호버 컨텐츠 내부 width
const HOVER_CONTENT_WIDTH = 64;
// 화살표 width
const HOVER_ARROW_WIDTH = 11;

// map으로 처리되는 부분은 함수로 분리해야 리랜더링이 일어나지 않는다!!
const HoverContent = ({ device, x, y, isHover, dateText }: HoverProps) => {
  // TODO x축 변경 필요

  const cellWidth = useMemo(() => (device === 'desktop' ? CELL_WIDTH : CELL_WIDTH_M), [device]);
  const cellHeight = useMemo(() => (device === 'desktop' ? CELL_HEIGHT : CELL_HEIGHT_M), [device]);
  const tableGap = useMemo(() => (device === 'desktop' ? TABLE_GAP : TABLE_GAP_M), [device]);
  const tableTotal = useMemo(() => (device === 'desktop' ? TABLE_TOTAL : TABLE_TOTAL_M), [device]);
  const yDiff = useMemo(() => (device === 'desktop' ? -1 : 7), [device]); // 화면 보면서 맞춤
  const rowIndex = x / tableTotal;

  const ContentXpos = useMemo(() => {
    // x의 시작 지점
    // 0, 23, 46 | 0 39 78
    // x - (패딩 값 + 화살표 반) + 셀의 중앙

    if (rowIndex < 3) return x - (HOVER_WRAPPER_PADDING_RIGHT + HOVER_ARROW_WIDTH / 2) + cellWidth / 2;
    // 테이블 셀 중앙 - (호버 컨텐츠 길이/2) + 셀의 반
    else if (rowIndex === 3) return tableTotal * rowIndex - HOVER_WRAPPER_WIDTH / 2 + cellWidth / 2;
    //
    // else return x - HOVER_CONTENT_WIDTH - HOVER_ARROW_WIDTH / 2;
    else return x - (HOVER_WRAPPER_WIDTH - HOVER_WRAPPER_PADDING_RIGHT - cellWidth / 2 - HOVER_ARROW_WIDTH / 2);
  }, [x, cellWidth, rowIndex, tableTotal]);

  // 호버 Y축 이동
  const ContentYpos = useMemo(() => {
    // Y의 시작 지점
    // 0, 15, 30 ....
    // Y 포지션 + (row * GAP의 간격)
    const colIndex = y / cellHeight;
    const firstYPos = y + tableGap * colIndex;
    // Y의 시작 지점 - (툴팁 높이 + 화살표 높이)
    return firstYPos - HOVER_WRAPPER_HEIGHT + yDiff;
  }, [y, cellHeight, tableGap, yDiff]);

  // 화살표가 보여질 위치
  const ArrowXpos = useMemo(() => {
    // 인덱스 3이하는 화살표 그대로
    if (rowIndex < 3) return 0;
    // hover content width / 2 - 화살표 반
    else if (rowIndex === 3) return HOVER_CONTENT_WIDTH / 2 - HOVER_ARROW_WIDTH / 2;
    // 인덱스 3이상은 화살표 오른쪽
    else return HOVER_CONTENT_WIDTH - HOVER_ARROW_WIDTH;
  }, [rowIndex]);

  return (
    <Styled.GrassHoverContainer
      isHover={isHover}
      css={css`
        transform: ${`translate3d(${ContentXpos}px, ${ContentYpos}px, 0px)`};
      `}
    >
      <Styled.GrassHoverWrapper>
        <div>
          <Typo.Label1 color={FONT_COLOR.GRAY_3}>{dateText}</Typo.Label1>
        </div>
        <Styled.RoundArrow
          css={css`
            transform: ${`translate3d(${ArrowXpos}px, 8px, 0px)`};
          `}
        >
          <IconGrassHoverArrow></IconGrassHoverArrow>
        </Styled.RoundArrow>
      </Styled.GrassHoverWrapper>
    </Styled.GrassHoverContainer>
  );
};

// GrassRow
const GrassRow = memo(function GrassRow({
  device,
  tanslateYPos,
  row,
  row_index,
  onClickCell,
  closeHover,
  onCellMouseEnter,
}: RowProps) {
  const cellWidth = useMemo(() => (device === 'desktop' ? CELL_WIDTH : CELL_WIDTH_M), [device]);
  const cellHeight = useMemo(() => (device === 'desktop' ? CELL_HEIGHT : CELL_HEIGHT_M), [device]);
  const tableTotal = useMemo(() => (device === 'desktop' ? TABLE_TOTAL : TABLE_TOTAL_M), [device]);
  const tableGap = useMemo(() => (device === 'desktop' ? TABLE_GAP : TABLE_GAP_M), [device]);

  return (
    <Styled.GrassRowG transform={`translate(0, ${tanslateYPos})`}>
      {row.map((column, col_index) => {
        return (
          <GrassCol
            key={`column-${col_index}`}
            width={cellWidth}
            height={cellHeight}
            x={col_index * tableTotal}
            y={row_index * (tableTotal - tableGap)}
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
    </Styled.GrassRowG>
  );
});

// GrassCol
const GrassCol = ({
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
}: Omit<ColProps, 'cellDate'>) => {
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
};

const Grass = ({ date, GrassData, onClickCell }: GrassProps) => {
  const [isHover, setIsHover] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const device = useResize();

  const closeHover = useCallback((e: MouseEvent<SVGRectElement>) => {
    e.stopPropagation();
    setIsHover(false);
  }, []);

  const onCellMouseEnter = useCallback(
    (e: MouseEvent<SVGRectElement>, date: string, x: number, y: number, cellStatus: GrassStatus) => {
      e.stopPropagation();
      if (cellStatus === 'disabled') return;
      setIsHover(true);
      setHoverText(format(new Date(date), 'yyyy.MM.dd'));
      setHoverPosition((prev) => ({ ...prev, x, y }));
    },
    [],
  );

  return (
    <Styled.GrassContainer>
      <div>
        <Styled.GrassDate>
          {device === 'desktop' ? (
            <Typo.Label2 color={FONT_COLOR.GRAY_3}>{date}</Typo.Label2>
          ) : (
            <Typo.H1 color={FONT_COLOR.GRAY_3}>{date}</Typo.H1>
          )}
        </Styled.GrassDate>
        <Styled.GrassSVGWrapper>
          <svg
            width={device === 'desktop' ? TABLE_WIDTH : TABLE_WIDTH_M}
            height={device === 'desktop' ? TABLE_HEIGHT : TABLE_HEIGHT_M}
          >
            {GrassData?.map((row, row_index) => {
              return (
                <GrassRow
                  device={device}
                  key={`row-${row_index}`}
                  tanslateYPos={row_index * (device === 'desktop' ? TABLE_GAP : TABLE_GAP_M)}
                  row={row}
                  row_index={row_index}
                  onClickCell={onClickCell}
                  closeHover={closeHover}
                  onCellMouseEnter={onCellMouseEnter}
                ></GrassRow>
              );
            })}
          </svg>
          <HoverContent
            device={device}
            isHover={isHover}
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
