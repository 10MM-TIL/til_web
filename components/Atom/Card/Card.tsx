import { ReactElement, useEffect, useState, memo, useCallback } from 'react';
import Image from 'next/image';
import * as Styled from './styles';
import * as Typo from '@/components/Atom/Typography';
import { IconCrown } from '@/assets/svgs/IconCrown';
import { CardProps, category } from './types';
import { css } from '@emotion/react';
import ContentsModal from '@/components/Molecules/ContentsModal/ContentsModal';

const Card = ({
  size,
  hasBadge = false,
  content,
  onClickContent,
  onClickUser,
  userpath,
  url,
}: CardProps): ReactElement => {
  const [tagList, setTagList] = useState([content.category]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (hasBadge) setTagList([...tagList, '#추천 회고']);
    else setTagList(tagList.filter((tag) => tag !== '#추천 회고'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasBadge]);

  const Badge = () => {
    return (
      <>
        <Styled.BadgeTop size={size}>
          <Styled.CrownIcon size={size}>
            <IconCrown></IconCrown>
          </Styled.CrownIcon>
        </Styled.BadgeTop>
        <Styled.BadgeBottom size={size}></Styled.BadgeBottom>
      </>
    );
  };

  return (
    <>
      <Styled.CardContainer
        size={size}
        onClick={() => {
          onClickContent(url);
          setIsOpen(true);
        }}
      >
        {hasBadge ? <Badge /> : null}
        <Styled.CardHeader>
          {tagList.map((tag, idx) => {
            return (
              <Styled.TagWrapper key={tag + idx}>
                <Typo.Label2 color='#22FFA2'>
                  {tag === '#추천 회고' ? ' ' : ''}
                  {tag}
                </Typo.Label2>
              </Styled.TagWrapper>
            );
          })}
        </Styled.CardHeader>
        <Styled.CardBodyContent>
          <Styled.CardTitle>
            <Typo.H2 color='#DADFE6'>{content?.header}</Typo.H2>
          </Styled.CardTitle>
          <Styled.CardBodyDesc>
            <Typo.Body color='#636C78'>{content?.body}</Typo.Body>
          </Styled.CardBodyDesc>
        </Styled.CardBodyContent>
        <Styled.CardInfoWrapper
          onClick={(e) => {
            e.stopPropagation();
            onClickUser(userpath);
          }}
        >
          <Image src={content?.img || ''} alt='profileImg' width={19} height={19} />
          <Styled.CardUserProfile>
            <Typo.Label1 color='#C5CAD0'>{content?.name}</Typo.Label1>
          </Styled.CardUserProfile>
          <div>
            <Typo.Label1 color='#636C78'>{content?.date}</Typo.Label1>
          </div>
        </Styled.CardInfoWrapper>
      </Styled.CardContainer>
      {isOpen && <ContentsModal isOpen={isOpen} />}
    </>
  );
};

export default memo(Card);
