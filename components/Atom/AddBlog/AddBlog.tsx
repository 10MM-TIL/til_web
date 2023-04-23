import { IconPlus } from '@/assets/svgs/IconPlus';
import * as Typo from '@/components/Atom/Typography';
import { FONT_COLOR } from '@/constants/color';
import { Container } from './style';

interface AddBlogProps {
  onClick?: () => void;
}

const AddBlog = ({ onClick }: AddBlogProps) => {
  return (
    <Container onClick={onClick}>
      <IconPlus />
      <Typo.Label1 color={FONT_COLOR.GRAY_1}>추가</Typo.Label1>
    </Container>
  );
};

export default AddBlog;
