import { ReactElement, useEffect, useState } from 'react';
import IconBrunch from '@/assets/svgs/IconBrunch';
import IconNaver from '@/assets/svgs/IconNaver';
import IconTistory from '@/assets/svgs/IconTistory';
import IconVelog from '@/assets/svgs/IconVelog';
import IconMedium from '@/assets/svgs/IconMedium';
import IconCustom from '@/assets/svgs/IconCustom';

type blogName = 'naver' | 'tistory' | 'brunch' | 'velog' | 'medium' | 'custom';
type BlogTypeObject = {
  [K in blogName]: BlogImageObject;
};
type BlogImageObject = {
  src: string | ReactElement;
};

const BlogIcon = ({ url, size = 20 }: { url: string; size?: number }) => {
  const [blogType, setBlogType] = useState<blogName>('custom');
  useEffect(() => {
    if (url.indexOf('naver.com') !== -1) {
      setBlogType('naver');
    } else if (url.indexOf('tistory.com') !== -1) {
      setBlogType('tistory');
    } else if (url.indexOf('brunch.co.kr') !== -1) {
      setBlogType('brunch');
    } else if (url.indexOf('velog.io') !== -1) {
      setBlogType('velog');
    } else if (url.indexOf('medium.com') !== -1) {
      setBlogType('medium');
    } else {
      setBlogType('custom');
    }
  }, [setBlogType, url]);

  switch (blogType) {
    case 'naver':
      return <IconNaver size={size} />;
    case 'tistory':
      return <IconTistory size={size} />;
    case 'brunch':
      return <IconBrunch size={size} />;
    case 'velog':
      return <IconVelog size={size} />;
    case 'medium':
      return <IconMedium size={size} />;
    default:
      return <IconCustom size={size} />;
  }
};

export default BlogIcon;
