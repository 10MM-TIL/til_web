import { useEffect } from 'react';
import * as Typo from '@/components/Atom/Typography';
import * as Styled from './styles';
import { FONT_COLOR } from '@/constants/color';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import RadioGroup from '@/components/Molecules/RadioGroup';
import { useRecoilState } from 'recoil';
import { allPostState, categoryState } from '@/states/cardview';
import { fetchCategories } from '@/apis/cardview';
import { findSelectedCategory } from '@/utils/cardview';

// 카테고리 버튼
const CardCategory = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ['categories'], queryFn: () => fetchCategories() });
  const [categories, setCategories] = useRecoilState(categoryState);
  const [allPostContent, setAllPostState] = useRecoilState(allPostState);

  const RadioComponent = () => {
    const handleRadioClick = (value: number) => {
      setCategories(
        categories.map((category, index) => {
          if (index === value) return { ...category, selected: true };
          else return { ...category, selected: false };
        }),
      );
      queryClient.invalidateQueries(['all_category_card_infinite']);
    };

    return (
      <RadioGroup
        data={categories.map((c, i) => {
          return { id: i, text: c.name };
        })}
        selectedId={categories.findIndex((c) => c.selected)}
        onClick={handleRadioClick}
      />
    );
  };

  // category 저장
  useEffect(() => {
    if (data)
      setCategories(
        data.categories.map((category, index) => {
          if (index === 0) return { ...category, selected: true };
          else return { ...category, selected: false };
        }),
      );
  }, [data, setCategories]);

  return (
    <>
      <Styled.CategoryContainer>
        <Styled.CategoryHeader>
          <Typo.H1 color={FONT_COLOR.WHITE}>다른 사람들의 카드</Typo.H1>
        </Styled.CategoryHeader>
        <Styled.CategoryContent>
          <RadioComponent></RadioComponent>
        </Styled.CategoryContent>
      </Styled.CategoryContainer>
    </>
  );
};

export { CardCategory };
