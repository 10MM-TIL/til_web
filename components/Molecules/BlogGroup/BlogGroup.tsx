import BlogIcon from '@/components/Atom/BlogIcon';
import { BlogGroupContainter } from './style';
import { BlogData } from './type';
import BlogTooltip from '@/components/Atom/BlogTooltip';

const BlogGroup = ({ data }: { data: BlogData[] }) => {
  return (
    <BlogGroupContainter>
      {data?.map((value) => (
        <div key={value.identifier} style={{ position: 'relative' }}>
          <BlogTooltip blogName={value.url}>
            <a target='_blank' rel='noreferrer noopener' href={value.url}>
              <BlogIcon url={value.url} />
            </a>
          </BlogTooltip>
        </div>
      ))}
    </BlogGroupContainter>
  );
};

export default BlogGroup;
