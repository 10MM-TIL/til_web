import type { NextPage } from 'next';
import { useState } from 'react';

import * as Typo from '@/components/Typography';
import Toggle from '@/components/Toggle';
import Modal from '@/components/Modal';
import { Button } from '@/components/Button';
import { FONT_COLOR } from '@/constants/color';

const Test: NextPage = () => {
  const [modal, setModal] = useState(false);
  // !! Color관련 ThemeProvider 적용할건지 여부
  return (
    <div>
      <div>컴포넌트를 위한 테스트 페이지입니다.</div>
      <Typo.H1>Header 1</Typo.H1>
      <Typo.H1 color='#FF0000'>Header 1</Typo.H1>
      <Typo.H2>Header 2</Typo.H2>
      <Typo.H2 color='blue'>Header 2</Typo.H2>
      <Typo.SubHeader>Subheadline</Typo.SubHeader>
      <Typo.SubHeader color='orange'>Subheadline</Typo.SubHeader>
      <Typo.Body>Body</Typo.Body>
      <Typo.Body color='aqua'>Body</Typo.Body>
      <Typo.Label1>Label1</Typo.Label1>
      <br />
      <Typo.Label1 color='green'>Label1</Typo.Label1>
      <br />
      <Typo.Label1>Label2</Typo.Label1>
      <br />
      <Typo.Label1 color='violet'>Label2</Typo.Label1>
      <br />
      <Toggle />
      <br />
      <Button
        types='sm'
        onClick={() => {
          setModal(true);
        }}
      >
        모달버튼
      </Button>
      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <Typo.H1 style={{ fontSize: '24px' }} color={FONT_COLOR.WHITE}>
          제목
        </Typo.H1>
        <Typo.Body color={FONT_COLOR.GRAY_2}>내용</Typo.Body>
        <div> TEST DIV</div>
        <Toggle />
        <Button types='lg' onClick={() => setModal(false)}>
          모달 닫기 버튼 test
        </Button>
      </Modal>
    </div>
  );
};

export default Test;
