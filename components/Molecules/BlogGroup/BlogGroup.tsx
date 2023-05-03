import BlogIcon from '@/components/Atom/BlogIcon';
import { BlogGroupContainter } from './style';
interface BlogData {
  identifier: string;
  url: string;
}
interface BlogGroupProps {
  data: BlogData[];
}
const BlogGroup = ({ data }: BlogGroupProps) => {
  return (
    <BlogGroupContainter>
      {data.map((value) => (
        <a key={value.identifier} target='_blank' rel='noreferrer noopener' href={value.url}>
          <BlogIcon url={value.url} />
        </a>
      ))}
    </BlogGroupContainter>
  );
};

export default BlogGroup;
