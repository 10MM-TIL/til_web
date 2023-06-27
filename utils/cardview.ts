import { category, CategoryKeys, CategoryValues } from '@/components/Atom/Card/types';
import { categories } from '@/types/cardview';

export const findSelectedCategory = (categories: categories[]) => {
  return categories[categories.findIndex((category) => category.selected === true)]?.identifier;
};

export function findKeyByValue(value: CategoryValues): CategoryKeys | undefined {
  return Object.keys(category).find((key) => category[key as CategoryKeys] === value) as CategoryKeys | undefined;
}
