import styled from '@emotion/styled';
import { mq } from '@/styles/mediaQuery';

const PhotoAreaWrapper = styled.div<{ editable: boolean }>`
  width: ${(props) => (props.editable ? '200px' : '80px')};
  height: ${(props) => (props.editable ? '200px' : '80px')};
  position: relative;
  ${mq('desktop')} {
    width: 200px;
    height: 200px;
  }
`;

const CircleContainer = styled.div<{ editable: boolean; imgUrl?: string }>`
  width: ${(props) => (props.editable ? '200px' : '80px')};
  height: ${(props) => (props.editable ? '200px' : '80px')};
  border-radius: 100%;
  overflow: hidden;
  position: relative;
  ${mq('desktop')} {
    width: 200px;
    height: 200px;
  }
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

const ModalContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export { PhotoAreaWrapper, CircleContainer, EditButton, ModalContentsContainer };
