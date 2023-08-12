import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SetterOrUpdater, useRecoilState } from 'recoil';

import { categoryState } from '@/stores/cardviewStateStore';
import { useCategories } from '@/hooks/queries/categoryQuery';

import { FONT_COLOR } from '@/constants/color';
import { category as CATEGORY, CategoryKeys } from '@/components/Atom/Card/types';
import * as Typo from '@/components/Atom/Typography';
import RadioGroup from '@/components/Molecules/RadioGroup';
import { categories } from '@/types/cardview';

import * as Styled from './styles';
import { CardViewPageProps } from '@/pages/cardview';

export type RadioComponentProps = {
  setCategories: SetterOrUpdater<categories[]>;
  categories: categories[];
};

const RadioComponent = ({ setCategories, categories }: RadioComponentProps) => {
  const router = useRouter();
  const handleRadioClick = (value: string) => {
    setCategories(
      categories.map((category) => {
        if (category.identifier === value) return { ...category, selected: true };
        else return { ...category, selected: false };
      }),
    );

    router.push({
      query: { category: categories.find((c) => c.identifier === value)?.identifier || 'all' },
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

// 카테고리 버튼
const CardCategory = ({ categoryQuery }: CardViewPageProps) => {
  const [categories, setCategories] = useRecoilState(categoryState);
  const { data: categoryData, isSuccess } = useCategories();

  // category 받아온 배열 저장
  useEffect(() => {
    if (isSuccess) {
      setCategories([
        { identifier: 'all', name: '#전체', selected: categoryQuery === 'all' || categoryQuery === '' },
        ...categoryData.categories.map((category, index) => {
          if (category.identifier === categoryQuery) return { ...category, selected: true };
          else return { ...category, selected: false };
        }),
      ]);
    }
  }, [categoryData, setCategories, categoryQuery, isSuccess]);

  return (
    <>
      <Styled.CategoryContainer>
        <Styled.CategoryHeader>
          <Typo.H1 color={FONT_COLOR.WHITE}>다른 사람들의 카드</Typo.H1>
        </Styled.CategoryHeader>
        <Styled.CategoryContent>
          {isSuccess && <RadioComponent categories={categories} setCategories={setCategories}></RadioComponent>}
        </Styled.CategoryContent>
      </Styled.CategoryContainer>
    </>
  );
};

export default CardCategory;
