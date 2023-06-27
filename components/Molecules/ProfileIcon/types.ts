/**
 * img 파일 업로드 기능이 있을 때 만들어놓은 imgUrl
 * onClick 을 통해 화면단에 선택한 프로필 넘겨주는 역할
 */
export interface ProfileIconProps {
  imgUrl: string;
  editable?: boolean;
  onClick?: (id: number) => void;
}
