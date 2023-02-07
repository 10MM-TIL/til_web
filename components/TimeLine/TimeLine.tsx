import { ReactElement, useState, useRef, memo, ChangeEvent, useCallback, RefObject, useEffect } from 'react';
import Image from 'next/image';
import * as Typo from '@/components/Typography';
import * as Styled from './styles';
import { TimeLineProps } from './types';
import { EditDropdown, EditDropdownProps } from '@/components/EditDropdown';
import { POINT_COLOR, FONT_COLOR } from '@/constants/color';

// [TODO] 최대 글자수 지정 필요
const TITLE_MAX_LENGTH = 30;
const DESC_MAX_LENGTH = 50;

// 수정 클릭시 뜨는 '저장' | '취소' 버튼
const EditStatusButton = memo(function EditStatusButton({
  onCancelTimeLine,
  onSaveTimeLine,
}: {
  onCancelTimeLine: () => void;
  onSaveTimeLine: () => void;
}) {
  return (
    <>
      <Styled.TimeLineSaveButton onClick={onSaveTimeLine}>
        <Typo.Label2 color={POINT_COLOR.MAIN}>저장</Typo.Label2>
      </Styled.TimeLineSaveButton>
      <Styled.TimeLineCancelButton onClick={onCancelTimeLine}>
        <Typo.Label2 color={POINT_COLOR.MAIN}>취소</Typo.Label2>
      </Styled.TimeLineCancelButton>
    </>
  );
});

// 수정 클릭시 뜨는 입력 컴포넌트
const EditInputContent = memo(function EditInputContent({
  titleRef,
  descRef,
  error,
  title,
  desc,
  onChangeTitle,
  onChangeDesc,
}: {
  titleRef: RefObject<HTMLInputElement>;
  descRef: RefObject<HTMLInputElement>;
  error: string | null;
  title: string;
  desc: string;
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeDesc: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const [titleFocus, setTitleFocus] = useState(false);
  const [descFocus, setDescFocus] = useState(false);

  return (
    <>
      <Styled.TimeLineInputWrapper>
        <Styled.TimeLineTitleWrapper>
          <Styled.TimeLineTitleInput
            ref={titleRef}
            value={title}
            onChange={onChangeTitle}
            maxLength={TITLE_MAX_LENGTH}
            onFocus={() => setTitleFocus(true)}
            onBlur={() => setTitleFocus(false)}
            disabled={!!error}
          ></Styled.TimeLineTitleInput>
          <Typo.Label2 color={FONT_COLOR.GRAY_2}>
            {titleFocus ? `${title.length} / ${titleRef.current?.maxLength}` : ''}
          </Typo.Label2>
        </Styled.TimeLineTitleWrapper>
        <Styled.TimeLineDescWrapper>
          <Styled.TimeLineDescInput
            ref={descRef}
            value={desc}
            onChange={onChangeDesc}
            maxLength={DESC_MAX_LENGTH}
            onFocus={() => setDescFocus(true)}
            onBlur={() => setDescFocus(false)}
            disabled={!!error}
          ></Styled.TimeLineDescInput>
          <Typo.Label2 color={FONT_COLOR.GRAY_2}>
            {descFocus ? `${desc.length} / ${descRef.current?.maxLength}` : ''}
          </Typo.Label2>
        </Styled.TimeLineDescWrapper>
      </Styled.TimeLineInputWrapper>
    </>
  );
});

const TimeLine = ({
  content = {
    date: '',
    title: '',
    desc: '',
    img: '',
  },
  onDeleteContent,
  onSaveAllContent,
  moreButtonPositionCss,
  editListPositionCss,
}: TimeLineProps): ReactElement => {
  const moreButtonRef = useRef<HTMLUListElement>(null);
  const [timeLineContent, setTimeLineContent] = useState(content);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const [editList, setEditList] = useState<EditDropdownProps['editList']>([
    {
      text: '수정',
      onClickHandler: useCallback(() => {
        setIsEdit(true);
        setIsDropdownOpen(false);
      }, []),
    },
    {
      text: '삭제',
      onClickHandler: useCallback(() => {
        setIsDropdownOpen(false);
        onDeleteContent();
      }, [onDeleteContent]),
    },
  ]);

  // 수정시 title에 focus
  useEffect(() => {
    if (isEdit) titleRef.current?.focus();
  }, [isEdit]);

  // 드롭다운 Open/close 함수
  const toggleOpen = () => setIsDropdownOpen((prevIsOpen) => !prevIsOpen);

  // 저장
  const onSaveTimeLine = useCallback(async () => {
    // 추후 API 요청 추가 필요
    try {
      await onSaveAllContent(timeLineContent);
      setIsEdit(false);
    } catch (err) {
      setError('오류가 발생했습니다.');
    }
  }, [onSaveAllContent, timeLineContent]);

  // 취소
  const onCancelTimeLine = useCallback(() => {
    setTimeLineContent(content);
    setIsEdit(false);
    setError(null);
  }, [content]);

  // 타이틀 변경
  const onChangeTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTimeLineContent({ ...timeLineContent, title: e.target.value });
    },
    [timeLineContent],
  );

  // 내용 변경
  const onChangeDesc = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTimeLineContent({ ...timeLineContent, desc: e.target.value });
    },
    [timeLineContent],
  );

  return (
    <Styled.TimeLineContainer>
      {isEdit ? (
        <>
          <EditStatusButton onSaveTimeLine={() => onSaveTimeLine()} onCancelTimeLine={onCancelTimeLine} />
        </>
      ) : (
        <EditDropdown
          editList={editList}
          isOpen={isDropdownOpen}
          moreButtonRef={moreButtonRef}
          onCloseDropdown={toggleOpen}
          moreButtonPositionCss={moreButtonPositionCss}
          editListPositionCss={editListPositionCss}
        ></EditDropdown>
      )}
      <Styled.TimeLineDate>
        <Typo.Label1 color={FONT_COLOR.GRAY_2}>{timeLineContent?.date}</Typo.Label1>
      </Styled.TimeLineDate>
      <Styled.TimeLineContent>
        <div>
          {isEdit ? (
            <EditInputContent
              titleRef={titleRef}
              descRef={descRef}
              error={error}
              title={timeLineContent?.title}
              desc={timeLineContent?.desc}
              onChangeTitle={onChangeTitle}
              onChangeDesc={onChangeDesc}
            ></EditInputContent>
          ) : (
            <>
              <Styled.TimeLineTitle>
                <Typo.H1 color={FONT_COLOR.WHITE}>{timeLineContent?.title}</Typo.H1>
              </Styled.TimeLineTitle>
              <Styled.TimeLineDesc>
                <Typo.Label2 color={FONT_COLOR.GRAY_3}>{timeLineContent?.desc}</Typo.Label2>
              </Styled.TimeLineDesc>
            </>
          )}
        </div>
        <Styled.TimeLineImage>
          <Image src={timeLineContent?.img as string} alt='test' width={37} height={37} />
        </Styled.TimeLineImage>
      </Styled.TimeLineContent>
    </Styled.TimeLineContainer>
  );
};

export default memo(TimeLine);
