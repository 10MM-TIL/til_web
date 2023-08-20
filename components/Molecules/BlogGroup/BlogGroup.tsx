import BlogIcon from '@/components/Atom/BlogIcon';
import { BlogGroupContainter } from './style';
import { BlogData } from './type';

const BlogGroup = ({ data }: { data: BlogData[] }) => {
  return (
    <BlogGroupContainter>
      {data?.map((value) => (
        <a key={value.identifier} target='_blank' rel='noreferrer noopener' href={value.url}>
          <BlogIcon url={value.url} />
        </a>
      ))}
    </BlogGroupContainter>
  );
};

export default BlogGroup;
