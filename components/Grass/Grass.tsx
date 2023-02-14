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

const TABLE_TOTAL = 23; //(17 + 6)

const HoverContent = ({
  hoverRef,
  x,
  y,
  isHover,
  dateText,
  closeHover,
  onClickCell,
}: {
  hoverRef: RefObject<HTMLDivElement>;
  x: number;
  y: number;
  isHover: boolean;
  dateText: string;
  onClickCell: GrassProps['onClickCell'];
  closeHover: (e: MouseEvent<SVGRectElement>) => void;
}) => {
  // TODO x축 변경 필요
  const Xpos = useMemo(() => {
    // x의 시작 지점
    // 0, 23, 46
    // X의 시작 지점 - 왼쪽으로 얼마나 갈지 px
    // -17,
    const rowIndex = x / TABLE_TOTAL + 1;
    return -10;
  }, [x]);

  const Ypos = useMemo(() => {
    // Y의 시작 지점
    // 0, 15, 30 ....
    // Y 포지션 + (row * GAP의 간격)
    const colIndex = y / CELL_HEIGHT;
    const firstYPos = y + TABLE_GAP * (colIndex - 1);
    // Y의 시작 지점 - 툴팁 높이(50px)
    return firstYPos - 50;
  }, [y]);

  return (
    <Styled.GrassHoverContainer
      isHover={isHover}
      css={css`
        transform: ${`translate3d(${Xpos}px, ${Ypos}px, 0px)`};
      `}
      // onMouseEnter={(e) => closeHover(e)}
      ref={hoverRef}
    >
      <div>
        <Typo.Label1 color={FONT_COLOR.GRAY_3}>{dateText}</Typo.Label1>
        <button onClick={() => onClickCell(dateText)}>
          <IconArrow></IconArrow>
        </button>
      </div>
    </Styled.GrassHoverContainer>
  );
};

// GrassRow
const GrassRow = ({ tanslateYPos, children }: RowProps) => {
  return <Styled.GrassRowG transform={`translate(0, ${tanslateYPos})`}>{children}</Styled.GrassRowG>;
};

const Grass = ({ date, GrassData, onClickCell }: GrassProps) => {
  const [isHover, setIsHover] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const hoverRef = useRef<HTMLDivElement>(null);

  const closeHover = (e: MouseEvent<SVGRectElement>) => {
    e.stopPropagation();
    setIsHover(false);
  };

  // GrassCol
  const GrassCol = memo(function GrassCol({
    width,
    height,
    x,
    y,
    rx,
    ry,
    text,
    cellStatus,
    onClickCell,
    onCellMouseEnter,
  }: Omit<ColProps, 'onCLickCell' | 'cellDate'> & {
    onClickCell: () => void;
    onCellMouseEnter: (text: string, x: number, y: number, cellStatus: GrassStatus) => void;
  }) {
    // const handleMouseMove = useCallback((e: MouseEvent<SVGRectElement>) => {
    //   const tooltipRect = hoverRef.current?.getBoundingClientRect();
    //   if (!tooltipRect) return;
    //   const mouseY = e.clientY;
    //   const distance = Math.round(mouseY - tooltipRect.bottom);
    //   console.log(e);

    //   if (distance > 50) {
    //     // 마우스 커서와 Tooltip 사이의 거리가 10px 이상이면
    //     setIsHover(false);
    //   }
    // }, []);

    useEffect(() => {
      console.log('rerender');
    }, [cellStatus]);

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
          onClick={onClickCell}
          onMouseEnter={(e) => {
            e.stopPropagation();
            onCellMouseEnter(text, x, y, cellStatus);
          }}
          onMouseOut={(e) => closeHover(e)}
        ></Styled.GrassCell>
      </>
    );
  });

  const GrassDate = () => {
    return (
      <Styled.GrassDate>
        <Typo.Label2 color={FONT_COLOR.GRAY_3}>{date}</Typo.Label2>
      </Styled.GrassDate>
    );
  };

  const onCellMouseEnter = useCallback((text: string, x: number, y: number, cellStatus: GrassStatus) => {
    if (cellStatus === 'disabled') return;
    setIsHover(true);
    setHoverText(format(new Date(text), 'yyyy.MM.dd'));
    setHoverPosition((prevPos) => ({ ...prevPos, x, y }));
  }, []);

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
                        text={column.date}
                        cellStatus={column.status}
                        onClickCell={() => onClickCell(column.date)}
                        onCellMouseEnter={() =>
                          onCellMouseEnter(
                            column.date,
                            col_index * TABLE_TOTAL,
                            row_index * (TABLE_TOTAL - TABLE_GAP),
                            column.status,
                          )
                        }
                      ></GrassCol>
                    );
                  })}
                </GrassRow>
              );
            })}
          </svg>
          <HoverContent
            hoverRef={hoverRef}
            x={hoverPosition.x}
            y={hoverPosition.y}
            isHover={isHover}
            dateText={hoverText}
            onClickCell={onClickCell}
            closeHover={closeHover}
          ></HoverContent>
        </Styled.GrassSVGWrapper>
      </div>
    </Styled.GrassContainer>
  );
};

export default memo(Grass);
