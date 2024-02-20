import Image from 'next/image';

import { FONT_COLOR } from '@/constants/color';
import Modal from '@/components/Atom/Modal';
import * as Typo from '@/components/Atom/Typography';
import { RetrospectItem } from '@/apis/retrospectCardview';

import { ContentsWrapper, CategoryWrapper, QnAWrapper, AnswerWrapper, UserInfoWrapper } from './style';

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
              <AnswerWrapper>
                <Typo.Label2 color={FONT_COLOR.GRAY_3}>{value.answer || '-'}</Typo.Label2>
              </AnswerWrapper>
            </QnAWrapper>
          );
        })}
        <UserInfoWrapper>
          <Image src={item?.profileImgSrc || ''} alt='profileImg' width={19} height={19} />
          <Typo.Label2 color={FONT_COLOR.GRAY_3}> {userName}</Typo.Label2>
        </UserInfoWrapper>
      </ContentsWrapper>
    </Modal>
  );
};
