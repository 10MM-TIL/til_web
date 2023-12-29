import { FONT_COLOR } from '@/constants/color';
import Modal from '@/components/Atom/Modal';
import * as Typo from '@/components/Atom/Typography';
import { ContentsWrapper, CategoryWrapper, QnAWrapper, AnswerWrapper } from './style';
import { RetrospectItem } from '@/apis/retrospectCardview';

export const ContentsModal = ({
  isOpen,
  item,
  onClose,
}: {
  isOpen: boolean;
  item: RetrospectItem;
  onClose: () => void;
}) => {
  const { questionTypeName, qna, userName } = item;
  return (
    <Modal closable={true} onClose={onClose} isOpen={isOpen}>
      <ContentsWrapper>
        <CategoryWrapper>
          <Typo.Label2 color='#22FFA2'>#{questionTypeName}</Typo.Label2>
        </CategoryWrapper>
        {qna.map((value, index) => {
          return (
            <QnAWrapper key={`${value.questionName}_${index}`}>
              <Typo.SubHeader color={FONT_COLOR.GRAY_3}>
                Q{index + 1}. {value.questionName}
              </Typo.SubHeader>
              <AnswerWrapper>{value.answer || '-'}</AnswerWrapper>
            </QnAWrapper>
          );
        })}
        <Typo.Label2 color={FONT_COLOR.GRAY_3}> {userName}</Typo.Label2>
      </ContentsWrapper>
    </Modal>
  );
};
