import { FONT_COLOR } from '@/constants/color';
import Modal from '@/components/Atom/Modal';
import * as Typo from '@/components/Atom/Typography';
import { ContentsWrapper, CategoryWrapper, QnAWrapper, AnswerWrapper } from './style';

export const ContentsModal = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Modal closable={true} onClose={() => {}} isOpen={isOpen}>
      <ContentsWrapper>
        <CategoryWrapper>
          <Typo.Label2 color='#22FFA2'>#하루회고</Typo.Label2>
        </CategoryWrapper>
        <QnAWrapper>
          <Typo.SubHeader color={FONT_COLOR.GRAY_3}>질문1</Typo.SubHeader>
          <AnswerWrapper>다아ㅏ아아아ㅏ뼙너녀버ㅜ녀벼ㅓ다바바ㅏ바바ㅏㅂ다며우ㅕㅇ벼ㅜㅕ우벼ㅜㅇ</AnswerWrapper>
        </QnAWrapper>
        <QnAWrapper>
          <Typo.SubHeader color={FONT_COLOR.GRAY_3}>질문2</Typo.SubHeader>
          <AnswerWrapper>
            다아12312312312ㅏ아아아ㅏ뼙너녀버ㅜ녀벼ㅓ다바바ㅏ바바ㅏㅂ다며우ㅕㅇ벼ㅜㅕ우벼ㅜㅇ
          </AnswerWrapper>
        </QnAWrapper>
        <QnAWrapper>
          <Typo.SubHeader color={FONT_COLOR.GRAY_3}>질문3</Typo.SubHeader>
          <AnswerWrapper>
            다아ㅏ아아ㅏ12312312312313123123뼙너녀버ㅜ녀벼ㅓ다바바ㅏ바바ㅏㅂ다며우ㅕㅇ벼ㅜㅕ우벼ㅜㅇ
          </AnswerWrapper>
        </QnAWrapper>
        name
      </ContentsWrapper>
    </Modal>
  );
};
