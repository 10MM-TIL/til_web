import { useEffect } from 'react';
import * as Typo from '@/components/Atom/Typography';
import * as Styled from './styles';
import { FONT_COLOR } from '@/constants/color';
import { useQueryClient } from '@tanstack/react-query';

import RadioGroup from '@/components/Molecules/RadioGroup';
import { useRecoilState } from 'recoil';
import { categoryState } from '@/states/cardview';
import { useCategories } from '@/hooks/queries/categoryQuery';

// 카테고리 버튼
const CardCategory = () => {
  const queryClient = useQueryClient();
  const { data: category } = useCategories();

  const [categories, setCategories] = useRecoilState(categoryState);
  // category 저장
  useEffect(() => {
    if (category?.data)
      setCategories(
        category.data.categories.map((category, index) => {
          if (index === 0) return { ...category, selected: true };
          else return { ...category, selected: false };
        }),
      );
  }, [category, setCategories]);

  const RadioComponent = () => {
    const handleRadioClick = (value: string) => {
      setCategories(
        categories.map((category, index) => {
          if (category.identifier === value) return { ...category, selected: true };
          else return { ...category, selected: false };
        }),
      );
    };

    return (
      <RadioGroup
        data={categories}
        selectedId={categories.find((c) => c.selected)?.identifier!}
        onClick={handleRadioClick}
      />
    );
  };

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
