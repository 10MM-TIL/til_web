import { ReactElement, useEffect, useState } from 'react';
import IconBrunch from '@/assets/svgs/IconBrunch.svg';
import IconNaver from '@/assets/svgs/IconNaver.svg';
import IconTistory from '@/assets/svgs/IconTistory.svg';
import IconVelog from '@/assets/svgs/IconVelog.svg';
import IconMedium from '@/assets/svgs/IconMedium.svg';
import IconCustom from '@/assets/svgs/IconCustom.svg';

type blogName = 'naver' | 'tistory' | 'brunch' | 'velog' | 'medium' | 'custom';
type BlogTypeObject = {
  [K in blogName]: BlogImageObject;
};
type BlogImageObject = {
  src: string | ReactElement;
};

const BlogIcon = ({ url }: { url: string }) => {
  const [blogType, setBlogType] = useState<blogName>('custom');
  useEffect(() => {
    if (url.indexOf('naver') !== -1) {
      setBlogType('naver');
    } else if (url.indexOf('tistory') !== -1) {
      setBlogType('tistory');
    } else if (url.indexOf('brunch') !== -1) {
      setBlogType('brunch');
    } else if (url.indexOf('velog') !== -1) {
      setBlogType('velog');
    } else if (url.indexOf('medium') !== -1) {
      setBlogType('medium');
    } else {
      setBlogType('custom');
    }
  }, [setBlogType, url]);

  switch (blogType) {
    case 'naver':
      return <IconNaver />;
    case 'tistory':
      return <IconTistory />;
    case 'brunch':
      return <IconBrunch />;
    case 'velog':
      return <IconVelog />;
    case 'medium':
      return <IconMedium />;
    default:
      return <IconCustom />;
  }
};

export default BlogIcon;
