import { categories } from '@/types/cardview';

export const findSelectedCategory = (categories: categories[]) => {
  return categories[categories.findIndex((category) => category.selected === true)]?.identifier;
};
