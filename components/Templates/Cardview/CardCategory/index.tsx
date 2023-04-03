import { useEffect } from 'react';
import * as Typo from '@/components/Atom/Typography';
import * as Styled from './styles';
import { FONT_COLOR } from '@/constants/color';
import { useQuery } from '@tanstack/react-query';

import RadioGroup from '@/components/Molecules/RadioGroup';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { categoryState } from '@/states/cardview';
import { categoriesResponse } from '@/types/cardview';

const getCategories = async () => {
  const response = await axios.get<categoriesResponse>(`${process.env.NEXT_PUBLIC_API_URL}/v1/categories`);
  return response.data;
};

// 카테고리 버튼
const CardCategory = () => {
  const { data } = useQuery({ queryKey: ['categories'], queryFn: () => getCategories() });
  const [categories, setCategories] = useRecoilState(categoryState);

  const RadioComponent = () => {
    const handleRadioClick = (value: number) => {
      setCategories(
        categories.map((category, index) => {
          if (index === value) return { ...category, selected: true };
          else return { ...category, selected: false };
        }),
      );
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
