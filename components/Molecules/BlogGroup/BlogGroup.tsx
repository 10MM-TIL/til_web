import BlogIcon from '@/components/Atom/BlogIcon';
import { BlogGroupContainter, TooltipContainer } from './style';
import * as Typo from '@/components/Atom/Typography';
import { FONT_COLOR } from '@/constants/color';
import { useState } from 'react';
interface BlogData {
  identifier: string;
  url: string;
}
interface BlogGroupProps {
  data: BlogData[];
}
const Tooltip = ({ text, isHover }: { text: string; isHover: boolean }) => {
  return isHover ? (
    <TooltipContainer>
      <Typo.Label1 color={FONT_COLOR.GRAY_3}>{text}</Typo.Label1>
    </TooltipContainer>
  ) : null;
};

const BlogGroup = ({ data }: BlogGroupProps) => {
  const [isHover, setIsHover] = useState(false);
  const [text, setText] = useState('');
  return (
    <>
      <BlogGroupContainter>
        {data?.map((value) => (
          <a key={value.identifier} target='_blank' rel='noreferrer noopener' href={value.url}>
            <div
              onMouseEnter={() => {
                setIsHover(true);
                setText(value.url);
              }}
              onMouseLeave={() => setIsHover(false)}
            >
              <BlogIcon url={value.url} />
            </div>
          </a>
        ))}
      </BlogGroupContainter>
      <Tooltip text={text} isHover={isHover} />
    </>
  );
};

export default BlogGroup;
