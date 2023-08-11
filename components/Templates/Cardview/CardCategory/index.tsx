import { useEffect } from 'react';
import * as Typo from '@/components/Atom/Typography';
import * as Styled from './styles';
import { FONT_COLOR } from '@/constants/color';
import { useQueryClient } from '@tanstack/react-query';
import { category as CATEGORY, CategoryKeys } from '@/components/Atom/Card/types';

import RadioGroup from '@/components/Molecules/RadioGroup';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { categoryState } from '@/stores/cardviewStateStore';
import { useCategories } from '@/hooks/queries/categoryQuery';
import { useRouter } from 'next/router';
import { findKeyByValue, findSelectedCategory } from '@/utils/cardview';
import { categories } from '@/types/cardview';

export type RadioComponentProps = { setCategories: SetterOrUpdater<categories[]>; categories: categories[] };

const RadioComponent = ({ setCategories, categories }: RadioComponentProps) => {
  const router = useRouter();
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

export type CardViewPageProps = { category: CategoryKeys | undefined };
// 카테고리 버튼
const CardCategory = ({ category }: CardViewPageProps) => {
  const [categories, setCategories] = useRecoilState(categoryState);

  const { data: categoryData } = useCategories();

  // category 저장
  useEffect(() => {
    if (categoryData?.data) {
      setCategories(
        categoryData.data.categories.map((cat, index) => {
          if (category ? cat.name === CATEGORY[category] : index === 0) return { ...cat, selected: true };
          else return { ...cat, selected: false };
        }),
      );
    }
  }, [categoryData, setCategories, category]);

  return (
    <>
      <Styled.CategoryContainer>
        <Styled.CategoryHeader>
          <Typo.H1 color={FONT_COLOR.WHITE}>다른 사람들의 카드</Typo.H1>
        </Styled.CategoryHeader>
        <Styled.CategoryContent>
          <RadioComponent categories={categories} setCategories={setCategories}></RadioComponent>
        </Styled.CategoryContent>
      </Styled.CategoryContainer>
    </>
  );
};

export { CardCategory };
