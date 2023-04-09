import styled from '@emotion/styled';
import { mq } from '@/styles/mediaQuery';
import DefaultPhoto from '@/assets/images/default-photo.png';
// import { POINT_COLOR } from '@/constants/color';

const PhotoAreaWrapper = styled.div<{ editable: boolean }>`
  width: ${(props) => (props.editable ? '200px' : '80px')};
  height: ${(props) => (props.editable ? '200px' : '80px')};
  position: relative;
  ${mq('desktop')} {
    width: 200px;
    height: 200px;
  }
`;

const CircleContainer = styled.div<{ editable: boolean; imgUrl?: string | StaticImageData }>`
  width: ${(props) => (props.editable ? '200px' : '80px')};
  height: ${(props) => (props.editable ? '200px' : '80px')};
  border-radius: 100%;
  mix-blend-mode: ${(props) => (props.imgUrl === DefaultPhoto ? 'luminosity' : 'normal')};
  overflow: hidden;
  position: relative;
  ${mq('desktop')} {
    width: 200px;
    height: 200px;
  }
  background: white;
`;

const EditButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 47px;
  height: 47px;
  background: white;
  border-radius: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export { PhotoAreaWrapper, CircleContainer, EditButton };
