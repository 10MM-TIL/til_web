import { ReactElement, useEffect, useState, memo, useCallback } from 'react';
import Image from 'next/image';
import {
  CardContainer,
  CardHeader,
  CardInfoWrapper,
  CardBodyContent,
  CardBodyDesc,
  TagWrapper,
  BadgeTop,
  BadgeBottom,
  CrownIcon,
} from './styles';
import * as Typo from '@/components/Typography';
import { IconCrown } from '@/assets/svgs/IconCrown';
import { CardProps, category } from './types';

const Card = ({
  size,
  hasBadge = false,
  content,
  onClickTag,
  onClickContent,
  onClickUser,
}: CardProps): ReactElement => {
  const [tagList, setTagList] = useState([category[content.category]]);

  useEffect(() => {
    if (hasBadge) setTagList([...tagList, '추천 회고']);
    else setTagList(tagList.filter((tag) => tag !== '추천 회고'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasBadge]);

  const Badge = () => {
    return (
      <>
        <BadgeTop size={size}>
          <CrownIcon size={size}>
            <IconCrown></IconCrown>
          </CrownIcon>
        </BadgeTop>
        <BadgeBottom size={size}></BadgeBottom>
      </>
    );
  };

  return (
    <CardContainer size={size}>
      {hasBadge ? <Badge /> : null}
      <CardHeader>
        {tagList.map((tag) => {
          return (
            <TagWrapper key={tag} onClick={(e) => onClickTag(e, tag)}>
              <Typo.Label2 color='#22FFA2'>
                {tag === '추천 회고' ? ' ' : ''}#{tag}
              </Typo.Label2>
            </TagWrapper>
          );
        })}
      </CardHeader>
      <CardBodyContent onClick={onClickContent}>
        <div>
          <Typo.H2 color='#DADFE6'>{content?.header}</Typo.H2>
        </div>
        <CardBodyDesc>
          <Typo.Body color='#636C78'>{content?.body}</Typo.Body>
        </CardBodyDesc>
      </CardBodyContent>
      <CardInfoWrapper onClick={onClickUser}>
        <Image src={content?.img as string} alt='test' width={19} height={19} />
        <div>
          <Typo.Label1 color='#C5CAD0'>{content?.name}</Typo.Label1>
        </div>
        <div>
          <Typo.Label1 color='#636C78'>{content?.date}</Typo.Label1>
        </div>
      </CardInfoWrapper>
    </CardContainer>
  );
};

export default memo(Card);
