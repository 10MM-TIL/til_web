import { useEffect } from 'react';
import * as Typo from '@/components/Atom/Typography';
import * as Styled from './styles';
import { FONT_COLOR } from '@/constants/color';
import { useQueryClient } from '@tanstack/react-query';
import { category as CATEGORY, CategoryKeys } from '@/components/Atom/Card/types';

import RadioGroup from '@/components/Molecules/RadioGroup';
import { useRecoilState } from 'recoil';
import { categoryState } from '@/states/cardview';
import { useCategories } from '@/hooks/queries/categoryQuery';
import { useRouter } from 'next/router';
import { findKeyByValue, findSelectedCategory } from '@/utils/cardview';

// 카테고리 버튼
const CardCategory = () => {
  const queryClient = useQueryClient();
  const [categories, setCategories] = useRecoilState(categoryState);

  const { data: category } = useCategories();
  const router = useRouter();
  const { category: queryCategory } = router.query as { category: CategoryKeys | undefined };

  // category 저장
  useEffect(() => {
    if (category?.data) {
      setCategories(
        category.data.categories.map((category, index) => {
          if (queryCategory ? category.name === CATEGORY[queryCategory] : index === 0)
            return { ...category, selected: true };
          else return { ...category, selected: false };
        }),
      );
    }
  }, [category, setCategories, queryCategory]);

  const RadioComponent = () => {
    const handleRadioClick = (value: string) => {
      setCategories(
        categories.map((category, index) => {
          if (category.identifier === value) return { ...category, selected: true };
          else return { ...category, selected: false };
        }),
      );

      router.push({
        query: { category: findKeyByValue(categories.filter((c) => c.identifier === value)[0].name) },
      });
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
