import { Fragment } from 'react';
import BlogIcon from '@/components/Atom/BlogIcon';
import { BlogGroupContainter } from './style';
interface BlogData {
  url: string;
}
interface BlogGroupProps {
  data: BlogData[];
}
const BlogGroup = ({ data }: BlogGroupProps) => {
  return (
    <BlogGroupContainter>
      {data.map((value) => (
        <a key={value.url} target='_blank' rel='noreferrer noopener' href={value.url}>
          <BlogIcon url={value.url} />
        </a>
      ))}
    </BlogGroupContainter>
  );
};

export default BlogGroup;
