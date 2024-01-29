import Link from 'next/link';
import { FONT_COLOR } from '@/constants/color';
import * as Typo from '@/components/Atom/Typography';
import { footer, divider, wrapper } from './styles';

const Footer = () => {
  return (
    <footer css={wrapper}>
      <div css={footer}>
        <Link href='https://www.plip.kr/pcc/c791921f-5dc3-4cb0-baac-55e48ee2e585/privacy-policy' target='_blank'>
          <Typo.Body color={FONT_COLOR.GRAY_2}>개인정보처리방침</Typo.Body>
        </Link>
        <div css={divider} />
        <Link href='https://10miri.notion.site/a96b7e92cdee4bc2836a0012b8b610b7' target='_blank'>
          <Typo.Body color={FONT_COLOR.GRAY_2}>서비스 이용 약관</Typo.Body>
        </Link>
      </div>
      <Link href='https://10miri.notion.site/784d36cd04e74f67838cfa5e1b62012b' target='_blank' rel='noreferrer'>
        <Typo.Body color={FONT_COLOR.GRAY_2}>업데이트 노트</Typo.Body>
      </Link>
    </footer>
  );
};

export default Footer;
