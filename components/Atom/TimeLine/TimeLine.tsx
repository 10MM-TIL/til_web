import { ReactElement, useState, useRef, memo, ChangeEvent, useCallback, RefObject, useEffect } from 'react';
import Image from 'next/image';
import * as Typo from '@/components/Atom/Typography';
import * as Styled from './styles';
import { TimeLineProps } from './types';
import { POINT_COLOR, FONT_COLOR } from '@/constants/color';
import IconTrash from '@/assets/svgs/IconTrash';
import { TrashContainer } from '@/components/Templates/TimelineTemplate/style';

// [TODO] 최대 글자수 지정 필요
const TITLE_MAX_LENGTH = 30;
const DESC_MAX_LENGTH = 100;

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
        <Typo.Label2 color={FONT_COLOR.WHITE}>취소</Typo.Label2>
      </Styled.TimeLineCancelButton>
    </>
  );
});

// 날짜
const TimeLineDate = memo(function TimeLineDate({ date }: { date: string }) {
  return (
    <Styled.TimeLineDate>
      <Typo.Label1 color={FONT_COLOR.GRAY_2}>{date}</Typo.Label1>
    </Styled.TimeLineDate>
  );
});

// 이미지
const TimeLineImage = memo(function TimeLineImage({ src }: { src: string }) {
  return (
    <Styled.TimeLineImage>
      <Image src={src} alt='test' width={37} height={37} />
    </Styled.TimeLineImage>
  );
});

// 타이틀 input
const TimeLineTitleInput = memo(function TimeLineTitleInput({
  titleRef,
  error,
  title,
  onChangeTitle,
}: {
  titleRef: RefObject<HTMLInputElement>;
  error: string | null;
  title: string;
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const [titleFocus, setTitleFocus] = useState(false);

  return (
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
        {titleFocus ? `${title?.length} / ${titleRef.current?.maxLength}` : ''}
      </Typo.Label2>
    </Styled.TimeLineTitleWrapper>
  );
});

// 설명 Input
const TimeLineDescInput = memo(function TimeLineDescInput({
  descRef,
  error,
  desc,
  onChangeDesc,
}: {
  descRef: RefObject<HTMLInputElement>;
  error: string | null;
  desc: string;
  onChangeDesc: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const [descFocus, setDescFocus] = useState(false);

  return (
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
        {descFocus ? `${desc?.length} / ${descRef.current?.maxLength}` : ''}
      </Typo.Label2>
    </Styled.TimeLineDescWrapper>
  );
});

const TimeLine = ({
  content = {
    date: '',
    title: '',
    qna: [],
  },
  onDeleteContent,
  deletable,
}: TimeLineProps): ReactElement => {
  const [timeLineContent, setTimeLineContent] = useState(content);
  const { qna, title } = content;

  const [isEdit, setIsEdit] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  // 수정시 title에 focus
  useEffect(() => {
    if (isEdit) titleRef.current?.focus();
  }, [isEdit]);

  return (
    <Styled.TimeLineContainer>
      <TimeLineDate date={timeLineContent?.date}></TimeLineDate>
      {deletable && (
        <TrashContainer onClick={() => onDeleteContent()}>
          <IconTrash />
        </TrashContainer>
      )}
      <Styled.TimeLineContent isEdit={isEdit}>
        <Styled.QuestionCategory>
          <Typo.H2 color={FONT_COLOR.WHITE}>{title}</Typo.H2>
        </Styled.QuestionCategory>
        <Styled.AnswerListContainer>
          {qna.map((item) => (
            <Styled.AnswerItemContainer key={`${item.questionName}`}>
              <Styled.QuestionTitle>
                <Typo.Body color={FONT_COLOR.GRAY_3}>{item.questionName}</Typo.Body>
              </Styled.QuestionTitle>
              <Styled.AnswerContents>{item.answer || '-'}</Styled.AnswerContents>
            </Styled.AnswerItemContainer>
          ))}
        </Styled.AnswerListContainer>
      </Styled.TimeLineContent>
    </Styled.TimeLineContainer>
  );
};

export default memo(TimeLine);
