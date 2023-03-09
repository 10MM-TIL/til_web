import type { NextPage } from 'next';
import {
  EditpageWrapper,
  EditpageContainer,
  ProfileContainer,
  InputContainer,
  PhotoContainer,
} from '@/styles/editpage.module';
import { BACKGROUND_COLOR, FONT_COLOR, POINT_COLOR } from '@/constants/color';

import * as Typo from '@/components/Typography';
// import PhotoArea from '@/components/PhotoArea';
import { TextField } from '@/components/TextField';

const Setting: NextPage = () => {
  return (
    <EditpageWrapper>
      <EditpageContainer>
        <ProfileContainer>
          <PhotoContainer>
            {/* <PhotoArea editable={true} /> */}
            {/* PhotoArea 가 develop에 추가가 되지 않아 임시 테스트용 원형 div */}
            <div style={{ width: '200px', height: '200px', borderRadius: '100%', background: 'white' }} />
          </PhotoContainer>
          <InputContainer>
            <TextField
              title='URL 주소 설정'
              isInput={true}
              useFixedString={true}
              inputValue={'sungjin(상태변경)'}
              useCopy={true}
              onChange={() => {}}
            />
            <TextField title='이름' isInput={true} inputValue={'이름테스트(상태로변경)'} onChange={() => {}} />
            <TextField title={'소개'} isInput={false} inputValue={'소개테스트'} onChange={() => {}} />
          </InputContainer>
        </ProfileContainer>
      </EditpageContainer>
    </EditpageWrapper>
  );
};

export default Setting;
