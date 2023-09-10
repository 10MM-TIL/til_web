import { ReactNode, useState } from 'react';
import BlogIcon from '@/components/Atom/BlogIcon';
import { BlogTooltipContainer, LabelDiv } from './styles';

export const BlogTooltip = ({ blogName, children }: { blogName: string; children: ReactNode }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        {children}
      </div>
      {isHover ? (
        <BlogTooltipContainer>
          <BlogIcon url={blogName} />
          <LabelDiv>{blogName}</LabelDiv>
        </BlogTooltipContainer>
      ) : null}
    </>
  );
};
